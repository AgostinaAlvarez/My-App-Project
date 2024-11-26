//este es mi archivo de controllers messageController.js

import { Socket } from "socket.io";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import { connectedUsers, io } from "../../index.js";

export const sendMessageUpdate = async (req, res) => {
  const senderId = req.user.id; // Id del usuario loggeado que está enviando el mensaje
  const { receiverId, content } = req.body;

  try {
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res
        .status(400)
        .json({ message: "Usuario receptor no encontrado" });
    }

    const sender = await User.findById(senderId);
    const isFriend = sender.friends.includes(receiverId);
    const conversationStatus = isFriend ? "message" : "request";

    // Crear y guardar el mensaje
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
      //status: messageStatus,
    });

    await newMessage.save();

    // Buscar la conversación
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    const return_message = await Message.findById(newMessage._id).populate({
      path: "sender",
      select: "username name lastname avatar", // Campos específicos del usuario
    });

    if (!conversation) {
      // Crear nueva conversación si no existe
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
        lastMessage: newMessage._id,
        conversation_type: conversationStatus,
      });

      // Volver a cargar la conversación con los datos completos
      conversation = await Conversation.findById(conversation._id)
        .populate("lastMessage")
        .populate({
          path: "messages",
          populate: {
            path: "sender",
            select: "username name lastname avatar",
          },
        })
        .populate({
          path: "participants",
          select: "username name lastname avatar",
        });

      //se creo una nueva conversacion asique voy a pasarlo
      const userSockets = connectedUsers[receiverId];

      if (userSockets) {
        userSockets.forEach((socketId) => {
          io.to(socketId).emit("privateMessage", {
            //conversation_type: conversationStatus,
            newMessage: return_message,
            //sender,
            conversationCreated: true,
            conversation,
          });
        });
      }

      return res.status(201).json({
        newMessage: return_message,
        conversationCreated: true,
        conversation,
      });
    } else {
      // Actualizar conversación existente
      conversation.lastMessage = newMessage._id;
      conversation.conversation_type = conversationStatus;
      conversation.messages.push(newMessage._id);
      await conversation.save();

      const userSockets = connectedUsers[receiverId];

      if (userSockets) {
        userSockets.forEach((socketId) => {
          io.to(socketId).emit("privateMessage", {
            newMessage: return_message,
            conversationCreated: false,
            conversation: {
              _id: conversation.id,
              conversation_type: conversationStatus,
            },
          });
        });
      }

      return res.status(201).json({
        newMessage: return_message,
        conversationCreated: false,
        conversation: {
          _id: conversation.id,
          conversation_type: conversationStatus,
        },
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al enviar el mensaje", error });
  }
};

// Enviar mensaje
export const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id; // Asegúrate de tener el id del usuario autenticado en req.user.id

  try {
    // Verifica si el receptor es amigo
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res
        .status(400)
        .json({ message: "Usuario receptor no encontrado" });
    }

    // Verifica si ya son amigos
    const isFriend = sender.friends.includes(receiverId);
    const messageStatus = isFriend ? "message" : "request";

    // Crear y guardar el mensaje
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
      status: messageStatus,
    });

    await newMessage.save();

    // Actualizar o crear la conversación
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // Crear una nueva conversación si no existe
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        lastMessage: newMessage._id,
      });
    } else {
      // Actualizar la conversación existente con el último mensaje
      conversation.lastMessage = newMessage._id;
      await conversation.save();
    }

    // Volver a cargar la conversación con los datos completos de los participantes y el último mensaje
    conversation = await Conversation.findById(conversation._id)
      .populate("lastMessage")
      .populate({
        path: "participants",
        select: "username name lastname avatar", // Obtener solo los datos necesarios de los participantes
      });

    console.log("enviando mensaje");

    const userSockets = connectedUsers[receiverId];

    if (userSockets) {
      userSockets.forEach((socketId) => {
        io.to(socketId).emit("privateMessage", {
          newMessage,
          sender,
          conversation,
        });
      });
    }

    return res.status(201).json({
      newMessage,
      conversation,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al enviar el mensaje", error });
  }
};

// Marcar mensaje como leído
export const markMessageAsRead = async (req, res) => {
  const { messageId } = req.params; // ID del mensaje
  const userId = req.user.id; // ID del usuario autenticado

  try {
    // Buscar el mensaje por su ID
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Mensaje no encontrado" });
    }

    // Verifica si el usuario que está leyendo el mensaje es el receptor
    if (message.receiver.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "No autorizado para leer este mensaje" });
    }

    // Actualizar el estado de "isRead" a true
    message.isRead = true;

    await message.save(); // Guardar los cambios

    return res
      .status(200)
      .json({ message: "Mensaje marcado como leído", message });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al marcar el mensaje como leído", error });
  }
};

// Marcar todos los mensajes no recibidos como recibidos
export const markMessagesAsReceived = async (req, res) => {
  const userId = req.user.id; // ID del usuario autenticado

  try {
    const messages = await Message.find({
      receiver: userId,
      isReceived: false,
    });

    console.log("mensajes");
    console.log(messages);

    if (messages.length === 0) {
      console.log("no hay nada");
      return res.status(200).json({ message: "No hay mensajes nuevos" });
    }

    // Actualizar el campo isReceived a true para todos los mensajes encontrados
    await Message.updateMany(
      {
        receiver: userId,
        isReceived: false,
      },
      { $set: { isReceived: true } }
    );

    return res.status(200).json({
      message: "Mensajes marcados como recibidos",
      updatedCount: messages.length, // Devolver la cantidad de mensajes actualizados
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al marcar los mensajes", error });
  }
};

export const getUnreadMessagesCount = async (req, res) => {
  const userId = req.user.id; // Usuario autenticado

  try {
    // Contar los mensajes no leídos
    const unreadMessagesCount = await Message.countDocuments({
      receiver: userId,
      isRead: false,
    });

    return res.status(200).json({ unreadMessagesCount });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al contar los mensajes no leídos", error });
  }
};

//chat entre dos usuarios
export const getMessagesBetweenUsers = async (req, res) => {
  const senderId = req.user.id; // ID del usuario logueado (emisor o receptor)
  const receiverId = req.params.userId; // ID del otro usuario (emisor o receptor)

  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("lastMessage");

    if (!conversation) {
      return res.status(200).json({ message: "no hay conversacion" });
    }

    const lastMessage = conversation.lastMessage;

    let updateLastMessage = null;

    if (
      lastMessage.sender.toString() === receiverId &&
      lastMessage.isRead === false
    ) {
      console.log("el ultimo mensaje es del usuario y no esta leido");
      await Message.findByIdAndUpdate(lastMessage._id, { isRead: true });
      updateLastMessage = conversation;
    }

    const messages_non_read = await Message.find({
      sender: receiverId,
      receiver: senderId,
      isRead: false,
    }).sort({ createdAt: 1 });

    if (messages_non_read.length > 0) {
      //console.log("mensajes no leidos del usuario");
      //console.log(messages_non_read);
      console.log("tengo que mandar este array para actualizarlo a true");
      const update = await Message.updateMany(
        { _id: { $in: messages_non_read.map((msg) => msg._id) } },
        { $set: { isRead: true } }
      );
      console.log("actualizados:");
      console.log(messages_non_read);
      //Tengo que mandarlos por un socket
    }

    // Buscar todos los mensajes entre los dos usuarios
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: 1 }); // Ordena por fecha de creación en orden ascendente

    //Conteo de mensajes no leidos:
    const unreadMessagesCount = await Message.countDocuments({
      receiver: senderId,
      isRead: false,
    });

    return res
      .status(200)
      .json({ messages, updateLastMessage, unreadMessagesCount });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los mensajes", error });
  }
};

// Marcar múltiples mensajes como leídos
export const markMessagesAsRead = async (req, res) => {
  const conversationId = req.params.conversationId;
  const receiverId = req.user.id; // El usuario autenticado (receptor)

  try {
    // Buscar todos los mensajes no leídos en la conversación para este receptor
    const messagesToRead = await Message.find({
      conversation: conversationId,
      receiver: receiverId,
      isRead: false,
    });

    // Actualizar los mensajes encontrados a isRead: true
    await Message.updateMany(
      { _id: { $in: messagesToRead.map((msg) => msg._id) } },
      { $set: { isRead: true } }
    );

    // Obtener los mensajes actualizados para devolverlos en la respuesta
    const updatedMessages = await Message.find({
      _id: { $in: messagesToRead.map((msg) => msg._id) },
    });

    return res.status(200).json({ updatedMessages });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al marcar los mensajes como leídos", error });
  }
};
