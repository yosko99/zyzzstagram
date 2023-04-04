import IPost from './IPost';
import IUser from './IUser';

interface IComment {
  id: string;
  content: string;
  author: IUser;
  authorId: string;
  post: IPost;
  postId: string;
  likedBy?: IUser[];
  createdAt: Date;
  _count: {
    likedBy: number;
  };
}

export default IComment;
