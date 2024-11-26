import Friendship from "../models/friendshipModel.js";
import User from "../models/userModel.js";

// Buscar usuarios por coincidencia en username y name
export const searchUsers = async (req, res) => {
  const userId = req.user.id;
  const { query } = req.body;

  try {
    const users = await User.find({
      $and: [
        { _id: { $ne: userId } }, // Filtrar usuarios cuyo _id sea diferente a userId
        {
          $or: [
            { username: { $regex: query, $options: "i" } },
            { name: { $regex: query, $options: "i" } },
          ],
        },
      ],
    });
    //Esta funcion bus
    return res.json({
      message: "Usuarios encontrados",
      users,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al buscar usuarios", error });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  const thisUserId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const existingFriendship = await Friendship.findOne({
      $or: [
        { userId1: userId, userId2: thisUserId },
        { userId1: thisUserId, userId2: userId },
      ],
    });

    // Calcular la cantidad de amigos
    const friendsCount = user.friends.length;

    return res.status(200).json({
      user: {
        userId: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        avatar: user.avatar,
        email: user.email,
        description: user.description,
        friends: friendsCount, // Devolver el conteo de amigos
      },
      existingFriendship,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el usuario", error });
  }
};

/*
EXAMPLE: 
{
  "user": {
    "_id": "userId", 
    "username": "john_doe",
    "name": "John",
    "lastname": "Doe",
    "avatar": "https://example.com/avatar.jpg",
    "email": "johndoe@example.com",
    "friends": ["otherUserId1", "otherUserId2"]
  },
  "existingFriendship": {
    "_id": "friendshipId",
    "userId1": "userId",
    "userId2": "thisUserId",
    "status": "pending" // or "accepted"
  }
}

*/
