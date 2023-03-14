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
}

export default IComment;
