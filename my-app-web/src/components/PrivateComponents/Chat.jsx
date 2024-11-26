import React, { useContext, useEffect, useState } from "react";
import {
  getMessageUserData,
  lastMessageFromUser,
} from "../../functions/MessagesFunctions";
import { AppContext } from "../../context/AppContext";
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";
import axios from "axios";
import { socket } from "../../structures/PrivateStructure";

const Chat = ({ selectedChat, userData, setSelectedChat }) => {
  const { setConversations, authToken } = useContext(AppContext);

  const initalState = selectedChat.messages;
  const [messages, setMessages] = useState(initalState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("privateMessage", (data) => {
      updateChat(data);
    });
  }, []);

  const updateChat = (data) => {
    const conversationId = data.conversation._id;
    const selectedChatId = selectedChat._id;

    if (conversationId === selectedChatId) {
      if (data.conversationCreated === false) {
        const newMessage = { ...data.newMessage, isRead: true };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    }
  };

  const sendMenssage = async () => {
    setMessage("");
    const receiverId = getMessageUserData(selectedChat, userData.userId)._id;
    const message_data = {
      receiverId,
      content: message,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/message/send_up",
        message_data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const conversationCreated = response.data.conversationCreated;

      if (conversationCreated === true) {
        //es una nueva conversacion, asique voy a setearla
      } else {
        //es una conversacion ya existente
        const newMessage = response.data.newMessage;
        const conversationId = response.data.conversation._id;
        const conversationType = response.data.conversation.conversation_type;

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        const chats = JSON.parse(localStorage.getItem("conversations"));
        const updateChats = chats.map((item) => {
          if (item._id === response.data.conversation._id) {
            return {
              ...item,
              messages: [...item.messages, newMessage],
              lastMessage: newMessage,
            };
          }
        });
        localStorage.setItem("conversations", JSON.stringify(updateChats));
        setConversations(updateChats);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>Chat seleccionado {selectedChat._id}</div>
      <div>
        <span>
          {getMessageUserData(selectedChat, userData.userId).name.toUpperCase()}{" "}
          {getMessageUserData(
            selectedChat,
            userData.userId
          ).lastname.toUpperCase()}
        </span>
      </div>
      <form>
        <TextArea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <Button
          type="primary"
          onClick={sendMenssage}
          disabled={
            message.trim() === ""
            //|| loadingChatScreen ? true : false
          }
        >
          Enviar
        </Button>
      </form>
      <div>
        {messages.map((item) => (
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <span style={{ fontWeight: 600 }}>{item.sender.name}</span>
            <span>{item.content}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Chat;
