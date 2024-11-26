export const getMessageUserData = (conversation, userId) => {
  const user = conversation.participants.find((item) => item._id !== userId);
  return user;
};

export const lastMessageFromUser = (sender, userId) => {
  if (sender === userId) {
    return true;
  } else {
    return false;
  }
};
