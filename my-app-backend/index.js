import dotenv from "dotenv/config.js";
import express from "express";
import http from "http"; // Importa el módulo http de Node
import { Server as SocketIOServer } from "socket.io"; // Importa Server de socket.io
import mongoose from "mongoose";
import cors from "cors";

import auth_routes from "./src/routes/auth_routes.js";

import user_routes from "./src/routes/user_routes.js";
import message_routes from "./src/routes/messages_routes.js";
import friendship_routes from "./src/routes/friendship_routes.js";
import conversation_routes from "./src/routes/conversation_routes.js";
import post_routes from "./src/routes/post_routes.js";
import comments_routes from "./src/routes/coments_routes.js";
import likes_routes from "./src/routes/likes_routes.js";

import Message from "./src/models/messageModel.js";
import Conversation from "./src/models/conversationModel.js";
import Friendship from "./src/models/friendshipModel.js";
import User from "./src/models/userModel.js";
import Post from "./src/models/postModel.js";
import Comment from "./src/models/comentsModel.js";
import Like from "./src/models/likeModel.js";

const PORT = process.env.PORT || 8000; // Coloca PORT como prioridad en la variable de entorno
const app = express();
const server = http.createServer(app); // Crea el servidor HTTP

export const io = new SocketIOServer(server, { cors: { origin: "*" } });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

app.use(express.json());
app.use(cors());

//Rutas
app.use("/auth", auth_routes);
app.use(user_routes);
app.use(message_routes);
app.use(friendship_routes);
app.use(conversation_routes);
app.use(post_routes);
app.use(comments_routes);
app.use(likes_routes);

export const connectedUsers = {}; // Almacenamos múltiples conexiones por cada usuario

// Cuando un usuario se conecta
io.on("connection", (socket) => {
  //console.log("Nuevo cliente conectado:", socket.id);

  // Asociamos el socket ID con el userId (supongamos que lo obtenemos de un token JWT o alguna autenticación)
  socket.on("authenticate", (userId) => {
    if (!connectedUsers[userId]) {
      connectedUsers[userId] = []; // Si no existe, creamos un array de socket IDs
    }

    // Guardamos el socket ID en el array de conexiones del usuario
    connectedUsers[userId].push(socket.id);
    console.log(
      `Usuario ${userId} conectado, con socket IDs: ${connectedUsers[userId]}`
    );
    console.log("objeto:");
    console.log(connectedUsers);
  });

  // Evento personalizado para eliminar una conexión específica de un usuario
  socket.on("removeUserConnection", (data) => {
    const { userId, socketId } = data;

    if (connectedUsers[userId]) {
      const index = connectedUsers[userId].indexOf(socketId);

      // Elimina solo el socket ID especificado
      if (index !== -1) {
        connectedUsers[userId].splice(index, 1); // Eliminamos este socket ID específico
        console.log(
          `Conexión eliminada para el usuario ${userId} con socket ID ${socketId}`
        );
      }

      // Si ya no hay conexiones activas para el usuario, eliminamos la entrada
      if (connectedUsers[userId].length === 0) {
        delete connectedUsers[userId];
        console.log(`Usuario ${userId} completamente desconectado.`);
      }
    } else {
      console.log(`Usuario ${userId} no encontrado en connectedUsers.`);
    }
  });

  // Cuando un usuario se desconecta
  socket.on("disconnect", () => {
    // Buscamos y eliminamos este socket ID del array del usuario
    for (let userId in connectedUsers) {
      const index = connectedUsers[userId].indexOf(socket.id);
      if (index !== -1) {
        connectedUsers[userId].splice(index, 1); // Eliminar el socket ID del array
        console.log(
          `Usuario ${userId} desconectado, socket ID eliminado: ${socket.id}`
        );
        break;
      }
    }
  });

  // Evento para enviar un mensaje privado a un usuario (funciona para múltiples conexiones)
  socket.on("sendMessage", (data) => {
    console.log("enviando un mensaje");
    console.log(data);
    const { toUserId, message_data } = data;
    const userSockets = connectedUsers[toUserId]; // Obtenemos todos los socket IDs del usuario destinatario

    if (userSockets) {
      userSockets.forEach((socketId) => {
        io.to(socketId).emit("privateMessage", message_data); // Enviamos el mensaje a todos los sockets del usuario
      });
    } else {
      console.log("Usuario no está conectado.");
    }
  });

  //Evento para mandar y recibir una notificacion
  socket.on("sendFriendRequest", (data) => {
    const { toUserId, senderData } = data;

    const userSockets = connectedUsers[toUserId]; // Obtenemos todos los socket IDs del usuario destinatario

    if (userSockets) {
      userSockets.forEach((socketId) => {
        io.to(socketId).emit("friendRequestNotification", senderData); // Enviamos el mensaje a todos los sockets del usuario
      });
    } else {
      console.log("Usuario no está conectado.");
    }
  });
});

const deleteAllData = async () => {
  try {
    // Eliminar todos los registros de User
    /*
    const userResult = await User.deleteMany({});
    console.log(`Se eliminaron ${userResult.deletedCount} usuarios.`);

    // Eliminar todos los registros de Message
    const messageResult = await Message.deleteMany({});
    console.log(`Se eliminaron ${messageResult.deletedCount} mensajes.`);

    // Eliminar todos los registros de Conversation
    const conversationResult = await Conversation.deleteMany({});
    console.log(
      `Se eliminaron ${conversationResult.deletedCount} conversaciones.`
    );

    // Eliminar todos los registros de Friendship
    const friendshipResult = await Friendship.deleteMany({});
    console.log(
      `Se eliminaron ${friendshipResult.deletedCount} solicitudes de amistad.`
    );

    //Eliminar todos los comentarios
    const comentsResults = await Comment.deleteMany({});
    console.log(`Se eliminaron ${comentsResults.deletedCount} comentarios.`);
    
    */
    //Eliminar los posts
    /*
    const postsResult = await Post.deleteMany({});
    console.log(`Se eliminaron ${postsResult.deletedCount} posts.`);

    //Eliminar los likes
    const likesResult = await Like.deleteMany({});
    console.log(`Se eliminaron ${likesResult.deletedCount} posts.`);
    */
    //Eliminar todos los comentarios
    const comentsResults = await Comment.deleteMany({});
    console.log(`Se eliminaron ${comentsResults.deletedCount} comentarios.`);
  } catch (error) {
    console.error("Error al eliminar datos:", error);
  }
};

const deletePosts = async () => {
  try {
    const postsResult = await Post.deleteMany({});
    console.log(`Se eliminaron ${postsResult.deletedCount} posts.`);
  } catch (error) {
    console.error("Error al eliminar datos:", error);
  }
};

//deletePosts();

/*
const deleteAllExceptOne = async () => {
  const messageIdToKeep = "6734e672e5cca0ad2646c1d7";

  try {
    // Elimina todos los mensajes excepto el que tenga el _id especificado
    const messageResult = await Message.deleteMany({
      _id: { $ne: messageIdToKeep },
    });

    console.log(`Se eliminaron ${messageResult.deletedCount} mensajes.`);
  } catch (error) {
    console.error("Error al eliminar datos:", error);
  }
};
*/
//deleteAllData();
//deleteAllExceptOne();
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
