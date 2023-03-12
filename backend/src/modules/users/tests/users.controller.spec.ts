/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { HttpException } from '@nestjs/common';

import { UsersService } from '../users.service';
import { PrismaService } from '../../../prisma/prisma.service';

import {
  createInvalidUserDto,
  createUserDto,
} from '../../../dto/mock/user.mock';

describe('Test users API', () => {
  const prisma = new PrismaService();
  const userService = new UsersService(prisma);
  const filename = 'testimage.jpg';

  describe('test createUser service', () => {
    it('should create a user successfully', async () => {
      const result = await userService.createUser(createUserDto, filename);

      expect(result.message).toEqual('User created successfully');
      expect(result.user.email).toEqual(createUserDto.email);
      expect(result.user.username).toEqual(createUserDto.username);
      expect(result.token).toBeTruthy();

      await userService.deleteUser(result.user);
    });

    it('should throw an error if email is already taken', async () => {
      const result = await userService.createUser(createUserDto, filename);

      await expect(
        userService.createUser(createUserDto, filename),
      ).rejects.toThrow(HttpException);

      await userService.deleteUser(result.user);
    });

    it('should return an error if input is invalid', async () => {
      await expect(
        // @ts-ignore
        userService.createUser(createInvalidUserDto),
      ).rejects.toThrow(PrismaClientValidationError);
    });
  });

  describe('test deleteUser service', () => {
    it('should delete a user successfully', async () => {
      const { user } = await userService.createUser(createUserDto, filename);
      const result = await userService.deleteUser(user);

      expect(result.message).toEqual('User deleted successfully');
    });
  });
});
