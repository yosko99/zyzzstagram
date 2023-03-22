import IUser from './IUser';

interface INotification {
  id: string;
  message: string;
  read: boolean;
  createdAt: Date;
  sender?: IUser;
  senderId: string;
  receiver?: IUser;
  receiverId: string;
}

export default INotification;
