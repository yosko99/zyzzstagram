import IUser from './IUser';

interface IStory {
  id: string;
  imageURL: string;
  createdAt: Date;
  user: IUser;
  userId: string;
}

export default IStory;
