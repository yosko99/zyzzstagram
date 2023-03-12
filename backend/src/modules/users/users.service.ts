import { HttpException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import deleteImage from '../../functions/deleteImage';

import { CreateUserDto } from '../../dto/CreateUser.dto';

import { PrismaService } from '../../prisma/prisma.service';
import IUser from 'src/interfaces/IUser';

@Injectable()
export class UsersService {
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
      token: this.generateToken(newUser.email, newUser.password),
    };
  }

  async deleteUser(user: IUser) {
    await this.prisma.user.delete({ where: { id: user.id } });
    deleteImage(user.imageURL);

    return {
      message: 'User deleted successfully',
    };
  }

  private generateToken(email: string, password: string) {
    const token = jwt.sign({ email, password }, process.env.JSONWEBTOKEN_KEY);

    return token;
  }
}
