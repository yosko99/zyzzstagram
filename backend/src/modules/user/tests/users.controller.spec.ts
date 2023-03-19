/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { HttpException } from '@nestjs/common';

import { UserService } from '../user.service';
import { PrismaService } from '../../../prisma/prisma.service';

import {
  createInvalidUserDto,
  createUserDto,
} from '../../../dto/mock/user.mock';

describe('Test users API', () => {
  const prisma = new PrismaService();
  const userService = new UserService(prisma);
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

  describe('test loginUser service', () => {
    test('should login successfully', async () => {
      const createUserResult = await userService.createUser(
        createUserDto,
        filename,
      );

      const loginResult = await userService.loginUser({
        username: createUserResult.user.username,
        password: createUserDto.password,
      });

      expect(loginResult.message).toEqual('Logged in successfully');
      expect(loginResult.token).toBeTruthy();

      await userService.deleteUser(createUserResult.user);
    });

    test('should throw error of non existent username', async () => {
      try {
        await userService.loginUser({
          username: 'invalid',
          password: 'a',
        });
      } catch (err) {
        const error = err as unknown as HttpException;

        expect(error.message).toEqual(
          'User with provided username does not exist',
        );
      }
    });

    test('should throw error of password mismatch', async () => {
      const createUserResult = await userService.createUser(
        createUserDto,
        filename,
      );

      try {
        await userService.loginUser({
          username: createUserDto.username,
          password: 'invalid',
        });
      } catch (err) {
        const error = err as unknown as HttpException;

        expect(error.message).toEqual('Provided invalid password');
      }

      await userService.deleteUser(createUserResult.user);
    });
  });
});
