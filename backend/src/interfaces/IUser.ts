import INotification from './INotification';
import IPost from './IPost';
import IStory from './IStory';

interface IUser {
  id: string;
  username: string;
  email: string;
  imageURL: string | null;
  description: string | null;
  password: string;
  posts?: IPost[];
  comments?: Comment[];
  likedPosts?: IPost[];
  savedPosts?: IPost[];
  likedComments?: Comment[];
  followers?: IUser[];
  following?: IUser[];
  stories?: IStory[];
  createdAt: Date;
  updatedAt: Date;
  notifications?: INotification[];
}

export default IUser;
