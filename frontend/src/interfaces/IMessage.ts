interface IMessage {
  senderId: string;
  text: string;
  img: string;
  date: {
    seconds: number;
  };
}

export default IMessage;
