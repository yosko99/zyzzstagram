import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import deleteImage from '../../functions/deleteImage';

import { CreateUserDto, LoginUserDto } from '../../dto/user.dto';

import { NotificationServiceImpl } from '../notification/notification.service.impl';
import { PrismaService } from '../../prisma/prisma.service';

import IUser from '../../interfaces/IUser';
import IToken from '../../interfaces/IToken';
import { UserService } from './user.service';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationServiceImpl,
  ) {}

  async getUsers(search?: string) {
    return await this.prisma.user.findMany({
      where: { username: { contains: search !== undefined ? search : '' } },
      select: {
        username: true,
        imageURL: true,
      },
      take: 10,
    });
  }

  async createUser({ email, password, username }: CreateUserDto) {
    const doesUserExist =
      (await this.prisma.user.findFirst({
        where: { OR: [{ email }, { username }] },
      })) !== null;

    if (doesUserExist) {
      throw new HttpException('Username or email is already taken', 409);
    }

    const hashedPassword = (await bcrypt.hash(password, 10)) as string;

    const newUser = await this.prisma.user.create({
      data: { email, password: hashedPassword, username },
      include: { followers: true, following: true },
    });

    return {
      message: 'User created successfully',
      user: newUser,
      token: this.generateToken(newUser.username, newUser.password),
    };
  }

  async updateCurrentUserPhoto(filename: string, { username }: IToken) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: { imageURL: true },
    });

    deleteImage(user.imageURL);

    const updatedUser = await this.prisma.user.update({
      where: { username },
      data: { imageURL: filename },
    });

    return {
      imageURL: updatedUser.imageURL,
      message: 'Profile photo updated',
    };
  }

  async deleteUser(user: IUser) {
    await this.prisma.user.delete({ where: { id: user.id } });

    deleteImage(user.imageURL);

    return {
      message: 'User deleted successfully',
    };
  }

  async loginUser({ email, password }: LoginUserDto) {
    const user = await this.checkUserExistence({ where: { email } });

    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new HttpException('Provided invalid password', 401);
    }

    const token = this.generateToken(user.username, password);

    return {
      message: 'Logged in successfully',
      token,
    };
  }

  async followUser(user: IUser, { username }: IToken) {
    await this.notificationService.createFollowNotification(
      user.username,
      username,
    );

    if (user.followers.some((user) => user.username === username)) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { followers: { disconnect: { username } } },
      });

      return {
        message: 'User unfollowed',
      };
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { followers: { connect: { username } } },
    });

    return {
      message: 'Followed user',
    };
  }

  async getCurrentUser({ username }: IToken) {
    const user = await this.checkUserExistence({
      where: { username },
      select: {
        username: true,
        imageURL: true,
        description: true,
        posts: {
          select: {
            imageURL: true,
            id: true,
            _count: { select: { comments: true, likedBy: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: { select: { followers: true, following: true, posts: true } },
      },
    });

    return {
      ...user,
      isSameAsRequester: true,
    };
  }

  async getCurrentUserSavedPosts({ username }: IToken) {
    const { savedPosts } = await this.prisma.user.findUnique({
      where: { username },
      select: {
        savedPosts: {
          select: {
            imageURL: true,
            id: true,
            _count: { select: { comments: true, likedBy: true } },
          },
        },
      },
    });

    return savedPosts;
  }

  async getCurrentUserSuggestedUsers({ username }: IToken) {
    const currentUser = await this.prisma.user.findUnique({
      where: { username },
      select: { username: true, imageURL: true },
    });

    let suggestedUsers = await this.prisma.user.findMany({
      where: {
        NOT: [
          {
            username,
          },
          {
            followers: {
              some: {
                username,
              },
            },
          },
        ],
      },
      select: {
        username: true,
        imageURL: true,
      },
      take: 5,
    });

    suggestedUsers = suggestedUsers.map((user) => {
      return {
        ...user,
        isFollowedByRequester: false,
      };
    });

    return {
      currentUser,
      suggestedUsers,
    };
  }

  async getUserByUsername(user: IUser, tokenData: IToken) {
    const isFollowedByRequester =
      user.followers.filter((user) => user.username === tokenData.username)
        .length !== 0;

    return {
      ...user,
      isFollowedByRequester,
      isSameAsRequester: user.username === tokenData.username,
    };
  }

  private generateToken(username: string, password: string) {
    const token = jwt.sign(
      { username, password },
      process.env.JSONWEBTOKEN_KEY,
    );

    return token;
  }

  private async checkUserExistence(query: Prisma.UserFindUniqueArgs) {
    const user = await this.prisma.user.findUnique(query);

    if (user === null) {
      throw new HttpException('Could not find provided user', 404);
    }

    return user;
  }

  getUserFollowers(user: IUser, tokenData: IToken) {
    return user.followers.map((follower) => {
      return {
        username: follower.username,
        imageURL: follower.imageURL,
        isSameAsRequester: follower.username === tokenData.username,
        isFollowedByRequester: this.isFollowedByRequester(
          follower.followers,
          tokenData.username,
        ),
      };
    });
  }

  getUserFollowing(user: IUser, tokenData: IToken) {
    return user.following.map((follower) => {
      return {
        username: follower.username,
        imageURL: follower.imageURL,
        isSameAsRequester: follower.username === tokenData.username,
        isFollowedByRequester: this.isFollowedByRequester(
          follower.followers,
          tokenData.username,
        ),
      };
    });
  }

  isFollowedByRequester(users: IUser[], username: string): boolean {
    return users.filter((user) => user.username === username).length !== 0;
  }
}
