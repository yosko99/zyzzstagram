import IComment from './IComment';
import IUser from './IUser';

interface IPost {
  id?: string;
  imageURL?: string | null;
  description?: string | null;
  published?: boolean;
  author?: IUser;
  authorId?: string;
  likedBy?: IUser[];
  comments?: IComment[];
  savedBy?: IUser[];
  createdAt?: Date;
  updatedAt?: Date;
  likedByUser?: boolean;
  savedByUser?: boolean;
}

export default IPost;
