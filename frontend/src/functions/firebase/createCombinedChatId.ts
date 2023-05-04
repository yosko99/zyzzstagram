const createCombinedChatId = (senderId: string, receiverId: string) =>
  senderId > receiverId ? senderId + receiverId : receiverId + senderId;

export default createCombinedChatId;
