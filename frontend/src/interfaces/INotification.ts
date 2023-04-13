import IComment from './IComment';
import IPost from './IPost';
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
  post?: IPost;
  comment: IComment;
}

export default INotification;
