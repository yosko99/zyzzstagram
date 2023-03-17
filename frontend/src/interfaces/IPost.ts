import IUser from './IUser';

interface IPost {
  id: string;
  imageURL: string;
  description: string | null;
  published: boolean;
  author: IUser;
  authorId: string;
  likedBy?: IUser[];
  comments?: Comment[];
  savedBy?: IUser[];
  createdAt: Date;
  updatedAt: Date;
  _count: {
    likedBy: number;
    comments: number;
    savedBy: number;
  };
}

export default IPost;
