import IComment from './IComment';
import IPost from './IPost';
import IStory from './IStory';
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
  story?: IStory;
  comment: IComment;
}

export default INotification;
