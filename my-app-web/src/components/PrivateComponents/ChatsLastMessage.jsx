import React from "react";
import { lastMessageFromUser } from "../../functions/MessagesFunctions";

const ChatsLastMessage = ({ lastMessage, sender, userId, isRead }) => {
  return (
    <>
      {lastMessageFromUser(sender, userId) ? (
        <div>
          <span>Tu: {lastMessage}</span>
        </div>
      ) : (
        <div>
          <span
            style={isRead === true ? { fontWeight: 100 } : { fontWeight: 600 }}
          >
            {lastMessage}
          </span>
        </div>
      )}
    </>
  );
};

export default ChatsLastMessage;
