import { connectedUsers, io } from "../../index.js";
import Friendship from "../models/friendshipModel.js";
import User from "../models/userModel.js";

export const sendFriendRequest = async (req, res) => {
  const senderId = req.user.id;
  const { receiverId } = req.body;

  try {
    // Buscar si ya existe una relación entre los usuarios
    const existingFriendship = await Friendship.findOne({
      $or: [
        { userId1: senderId, userId2: receiverId },
        { userId1: receiverId, userId2: senderId },
      ],
    });

    if (existingFriendship) {
      // Si la relación existe y está rechazada, actualizarla a "pending"
      if (existingFriendship.status === "rejected") {
        existingFriendship.status = "pending";
        //userid1 es el sender
        //userId2 es el receiver
        existingFriendship.userId1 = senderId;
        existingFriendship.userId2 = receiverId;
        existingFriendship.createdAt = Date.now(); // Actualizar la fecha
        await existingFriendship.save();

        // Notificar al receptor
        const senderData = await User.findById(senderId).select(
          "username name lastname avatar _id"
        );

        console.log(senderData);

        const userSockets = connectedUsers[receiverId];
        if (userSockets) {
          userSockets.forEach((socketId) => {
            io.to(socketId).emit("friendRequest", {
              sender: senderData,
              createdAt: existingFriendship.createdAt,
              status: existingFriendship.status,
              _id: existingFriendship._id,
            });
          });
        }

        return res.status(200).json({
          friend_request: existingFriendship,
        });
      }

      // Si ya son amigos o la solicitud está pendiente, devolver un error
      return res
        .status(400)
        .json({ message: "La solicitud ya existe o son amigos" });
    }

    // Crear una nueva solicitud si no existe ninguna relación previa
    const senderData = await User.findById(senderId).select(
      "username name lastname avatar _id"
    );

    const friendship = new Friendship({
      userId1: senderId,
      userId2: receiverId,
    });
    await friendship.save();

    // Notificar al receptor
    const userSockets = connectedUsers[receiverId];
    if (userSockets) {
      userSockets.forEach((socketId) => {
        io.to(socketId).emit("friendRequest", {
          sender: senderData,
          createdAt: friendship.createdAt,
          status: friendship.status,
          _id: friendship._id,
        });
      });
    }

    return res.status(201).json({ friend_request: friendship });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al enviar la solicitud de amistad", error });
  }

  /*

  console.log(senderId);
  console.log(receiverId);
  return res
    .status(500)
    .json({ message: "Error al enviar la solicitud de amistad" });
    */
};

export const respondToFriendRequest = async (req, res) => {
  const { friendshipId, status } = req.body; // status puede ser "accepted" o "rejected"

  const friendship = await Friendship.findById(friendshipId);
  if (!friendship) {
    return res
      .status(404)
      .json({ message: "Solicitud de amistad no encontrada" });
  }

  // Actualizar el estado de la amistad
  friendship.status = status;
  await friendship.save();

  if (status === "accepted") {
    const { userId1, userId2 } = friendship;

    // Actualizar el array de amigos en ambos usuarios
    await User.findByIdAndUpdate(userId1, {
      $addToSet: { friends: userId2.toString() },
    });
    await User.findByIdAndUpdate(userId2, {
      $addToSet: { friends: userId1.toString() },
    });

    // Notificar al receptor
    const receiver_id = userId1.toString();
    console.log(receiver_id);
    const accepter = await User.findById(userId2).select(
      "_id username name lastname avatar"
    );

    const userSockets = connectedUsers[receiver_id];

    console.log("enviandole evento a ");
    console.log(userSockets);
    if (userSockets) {
      userSockets.forEach((socketId) => {
        io.to(socketId).emit("acceptedFriendshipRequest", {
          _id: friendship._id,
          accepter: accepter,
        });
      });
    }

    return res.json({
      message: "Solicitud de amistad aceptada y amigos actualizados",
    });
  } else if (status === "rejected") {
    return res.json({ message: "Solicitud de amistad rechazada" });
  }
};

//obtenr todas las solicitudes de amistad que me han enviado
export const getPendingRequests = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    // Buscar las solicitudes pendientes donde userId1 coincide con el userId proporcionado
    const pendingFriendships = await Friendship.find({
      userId2: userId,
      status: "pending",
    }).populate({
      path: "userId1", // Popula userId1 para obtener datos del usuario que envió la solicitud
      select: "username name lastname _id", // Selecciona solo las propiedades requeridas
    });

    // Formatear los resultados para incluir la propiedad sender
    const result = pendingFriendships.map((friendship) => ({
      _id: friendship._id,
      sender: friendship.userId1, // Este es el usuario populado como "sender"
      status: friendship.status,
      createdAt: friendship.createdAt,
    }));

    return res.status(200).json({
      friendship_requests_recibed: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener las solicitudes de amistad pendientes",
      error: error.message,
    });
  }
};

//esta funcion es para ver todas las solicitudes de amistad

//userId1: emisor
//userId2: receptor

export const getUserFriends = async (req, res) => {
  const { userId } = req.params; // Obtén el userId desde los parámetros
  const { limit, page } = req.query; // Límite y página desde query params

  try {
    // Buscar al usuario y obtener su lista de amigos
    const user = await User.findById(userId).select("friends");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const friendsCount = user.friends.length; // Total de amigos

    // Usar paginación: calcular cuántos amigos mostrar y desde dónde
    const friends = await User.find({ _id: { $in: user.friends } })
      .select("username name lastname avatar _id")
      .skip((page - 1) * limit) // Saltar los resultados anteriores
      .limit(Number(limit)); // Limitar la cantidad de resultados

    // Devolver datos paginados
    return res.status(200).json({
      friends,
      totalFriends: friendsCount, // Número total de amigos
      page: Number(page), // Página actual
      totalPages: Math.ceil(friendsCount / limit), // Total de páginas
    });
  } catch (error) {
    console.error("Error al obtener los amigos del usuario:", error);
    return res.status(500).json({ message: "Error del servidor", error });
  }
};

export const unfollowUser = async (req, res) => {
  const userId = req.user.id; // ID del usuario que está solicitando el unfollow
  const { unfollowId } = req.body; // ID del usuario que se desea dejar de seguir

  try {
    // Buscar la relación de amistad
    const friendship = await Friendship.findOne({
      $or: [
        { userId1: userId, userId2: unfollowId },
        { userId1: unfollowId, userId2: userId },
      ],
    });

    if (!friendship) {
      return res
        .status(404)
        .json({ message: "No se encontró una relación de amistad existente" });
    }

    // Eliminar la relación de amistad
    await Friendship.findByIdAndDelete(friendship._id);

    // Eliminar de los arrays de amigos en ambos usuarios
    await User.findByIdAndUpdate(userId, {
      $pull: { friends: unfollowId },
    });

    await User.findByIdAndUpdate(unfollowId, {
      $pull: { friends: userId },
    });

    return res.status(200).json({ message: "Amistad eliminada exitosamente" });
  } catch (error) {
    console.error("Error al realizar el unfollow:", error);
    return res
      .status(500)
      .json({ message: "Error al realizar el unfollow", error });
  }
};
