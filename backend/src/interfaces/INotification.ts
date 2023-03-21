import IUser from './IUser';

interface INotification {
  id: string;
  message: string;
  read: boolean;
  createdAt: Date;
  user?: IUser;
  userId: string;
}

export default INotification;
