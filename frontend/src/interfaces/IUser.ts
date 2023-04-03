import IComment from './IComment';
import INotification from './INotification';
import IPost from './IPost';
import IStory from './IStory';

interface IUser {
  id: string;
  username: string;
  email: string;
  imageURL: string;
  description?: string | null;
  password: string;
  posts?: IPost[];
  comments?: IComment[];
  likedPosts?: IPost[];
  savedPosts?: IPost[];
  likedComments?: IComment[];
  followers?: IUser[];
  following?: IUser[];
  stories?: IStory[];
  createdAt: Date;
  updatedAt: Date;
  notifications?: INotification[];
  _count?: {
    followers: number;
    following: number;
    posts: number;
    comments: number;
    likedComments: number;
    likedPosts: number;
    notifications: number;
    savedPosts: number;
    stories: number;
  };
}

export default IUser;
