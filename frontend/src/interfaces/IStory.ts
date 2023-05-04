import IUser from './IUser';

interface IStory {
  id: string;
  imageURL: string;
  createdAt: Date;
  user?: IUser;
  userId?: string;
  likedByUser: boolean;
  likedBy: IUser[];
  sameAsRequester: boolean;
}

export default IStory;
