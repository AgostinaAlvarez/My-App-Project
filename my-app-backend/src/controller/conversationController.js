import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const getConversations = async (req, res) => {
  const userId = req.user.id;

  try {
    // Obtener todas las conversaciones del usuario
    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "username name lastname avatar",
        },
      })
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
      })
      .sort({ updatedAt: -1 }); // Ordenar por fecha de última actualización
    res.status(200).json(conversations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las conversaciones", error });
  }
};
