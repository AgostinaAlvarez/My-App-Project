import React from "react";
import ChatsLastMessage from "./ChatsLastMessage";
import { getMessageUserData } from "../../functions/MessagesFunctions";

const ChatsUserIcon = ({ conversation, index, userData, setSelectedChat }) => {
  return (
    <div
      key={index}
      className="messages-screen-contact-container"
      onClick={() => {
        setSelectedChat(conversation);
      }}
    >
      <div className="messages-screen-contact-avatar"></div>
      <div className="messages-screen-contact-info" style={{ width: "100%" }}>
        <span>
          {getMessageUserData(conversation, userData.userId).name}{" "}
          {getMessageUserData(conversation, userData.userId).lastname}
        </span>
        <ChatsLastMessage
          lastMessage={conversation.lastMessage.content}
          sender={conversation.lastMessage.sender._id}
          userId={userData.userId}
          isRead={conversation.lastMessage.isRead}
        />
      </div>
    </div>
  );
};

export default ChatsUserIcon;
