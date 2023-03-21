import { HttpException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import deleteImage from '../../functions/deleteImage';

import { CreateUserDto, LoginUserDto } from '../../dto/user.dto';

import { PrismaService } from '../../prisma/prisma.service';

import IUser from 'src/interfaces/IUser';
import IToken from 'src/interfaces/IToken';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    { email, password, username }: CreateUserDto,
    filename: string,
  ) {
    const doesUserExist =
      (await this.prisma.user.findFirst({
        where: { OR: [{ email }, { username }] },
      })) !== null;

    if (doesUserExist) {
      deleteImage(filename);
      throw new HttpException('Username or email is already taken', 409);
    }

    const hashedPassword = (await bcrypt.hash(password, 10)) as string;

    const newUser = await this.prisma.user.create({
      data: { email, password: hashedPassword, username, imageURL: filename },
    });

    return {
      message: 'User created successfully',
      user: newUser,
      token: this.generateToken(newUser.username, newUser.password),
    };
  }

  async deleteUser(user: IUser) {
    await this.prisma.notification.deleteMany({ where: { userId: user.id } });
    await this.prisma.story.deleteMany({ where: { userId: user.id } });
    await this.prisma.comment.deleteMany({ where: { authorId: user.id } });
    await this.prisma.post.deleteMany({ where: { authorId: user.id } });
    await this.prisma.user.delete({ where: { id: user.id } });

    deleteImage(user.imageURL);

    return {
      message: 'User deleted successfully',
    };
  }

  async loginUser({ username, password }: LoginUserDto) {
    const user = await this.checkUserExistence({ where: { username } });

    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new HttpException('Provided invalid password', 401);
    }

    const token = this.generateToken(username, password);

    return {
      message: 'Logged in successfully',
      token,
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

    return user;
  }

  private generateToken(username: string, password: string) {
    const token = jwt.sign(
      { username, password },
      process.env.JSONWEBTOKEN_KEY,
    );

    return token;
  }

  private checkUserExistence = async (query: any) => {
    const user = await this.prisma.user.findUnique(query);

    if (user === null) {
      throw new HttpException('Could not find provided user', 404);
    }

    return user;
  };
}
