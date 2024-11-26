import { Button } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  getMessageUserData,
  lastMessageFromUser,
} from "../../functions/MessagesFunctions";
import ChatsLastMessage from "../../components/PrivateComponents/ChatsLastMessage";
import ChatsUserIcon from "../../components/PrivateComponents/ChatsUserIcon";
import Chat from "../../components/PrivateComponents/Chat";

const MessagesScreen = () => {
  const { conversations, userData } = useContext(AppContext);

  const requestMessages = () => {
    const requests = conversations.filter(
      (item) => item.conversation_type === "request"
    );
    return requests;
  };

  const inboxMessages = () => {
    const requests = conversations.filter(
      (item) => item.conversation_type === "message"
    );
    return requests;
  };

  const [principalInbox, setPrincipalInbox] = useState(true);

  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="messages-screen">
      <div
        className="messages-screen-contact-list"
        style={{ borderRight: "1px solid black" }}
      >
        <div>
          <Button onClick={() => setPrincipalInbox(true)}>Mensajes</Button>
          <Button onClick={() => setPrincipalInbox(false)}>{`Solicitudes (${
            requestMessages().length
          })`}</Button>
        </div>
        {principalInbox ? (
          <>
            <div>Inbox principal</div>
            {inboxMessages().map((conversation, index) => (
              <ChatsUserIcon
                conversation={conversation}
                index={index}
                userData={userData}
                setSelectedChat={setSelectedChat}
              />
            ))}
          </>
        ) : (
          <>
            <div>Solicitudes</div>
            {requestMessages().map((conversation, index) => (
              <ChatsUserIcon
                conversation={conversation}
                index={index}
                userData={userData}
                setSelectedChat={setSelectedChat}
              />
            ))}
          </>
        )}
      </div>
      <div>
        {selectedChat === null ? (
          <div>No hay nada seleccionado</div>
        ) : (
          <>
            <Chat
              selectedChat={selectedChat}
              userData={userData}
              setSelectedChat={setSelectedChat}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesScreen;
