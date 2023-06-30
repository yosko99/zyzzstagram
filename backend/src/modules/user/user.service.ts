import { CreateUserDto, LoginUserDto } from 'src/dto/user.dto';
import IToken from 'src/interfaces/IToken';
import IUser from 'src/interfaces/IUser';

export interface UserService {
  getUsers(search?: string);

  createUser(createUserDto: CreateUserDto);

  updateCurrentUserPhoto(filename: string, { username }: IToken);

  deleteUser(user: IUser);

  loginUser({ email, password }: LoginUserDto);

  followUser(user: IUser, { username }: IToken);

  getCurrentUser({ username }: IToken);

  getCurrentUserSavedPosts({ username }: IToken);

  getCurrentUserSuggestedUsers({ username }: IToken);

  getUserByUsername(user: IUser, tokenData: IToken);

  getUserFollowers(user: IUser, tokenData: IToken);

  getUserFollowing(user: IUser, tokenData: IToken);

  isFollowedByRequester(users: IUser[], username: string): boolean;
}

export const UserService = Symbol('UserService');
