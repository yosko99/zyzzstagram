import IUser from './IUser';

interface IPost {
  id?: string;
  imageURL?: string | null;
  description?: string | null;
  published?: boolean;
  author?: IUser;
  authorId?: string;
  likedBy?: IUser[];
  comments?: Comment[];
  savedBy?: IUser[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default IPost;
