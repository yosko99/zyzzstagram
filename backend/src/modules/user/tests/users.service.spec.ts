/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { HttpException } from '@nestjs/common';

import { NotificationService } from '../../../modules/notification/notification.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserService } from '../user.service';

import {
  createInvalidUserDto,
  createUserDto,
} from '../../../dto/mock/user.mock';

describe('Test users API', () => {
  const prisma = new PrismaService();
  const notificationService = new NotificationService(prisma);
  const userService = new UserService(prisma, notificationService);
  const filename = 'testimage.jpg';

  describe('test createUser service', () => {
    it('should create a user successfully', async () => {
      const result = await userService.createUser(createUserDto);

      expect(result.message).toEqual('User created successfully');
      expect(result.user.email).toEqual(createUserDto.email);
      expect(result.user.username).toEqual(createUserDto.username);
      expect(result.token).toBeTruthy();

      await userService.deleteUser(result.user);
    });

    it('should throw an error if email is already taken', async () => {
      const result = await userService.createUser(createUserDto);

      await expect(userService.createUser(createUserDto)).rejects.toThrow(
        HttpException,
      );

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
      const { user } = await userService.createUser(createUserDto);
      const result = await userService.deleteUser(user);

      expect(result.message).toEqual('User deleted successfully');
    });
  });

  describe('test loginUser service', () => {
    test('should login successfully', async () => {
      const createUserResult = await userService.createUser(createUserDto);

      const loginResult = await userService.loginUser({
        email: createUserResult.user.email,
        password: createUserDto.password,
      });

      expect(loginResult.message).toEqual('Logged in successfully');
      expect(loginResult.token).toBeTruthy();

      await userService.deleteUser(createUserResult.user);
    });

    test('should throw error of non existent username', async () => {
      try {
        await userService.loginUser({
          email: 'invalid',
          password: 'a',
        });
      } catch (err) {
        const error = err as unknown as HttpException;

        expect(error.message).toEqual('Could not find provided user');
      }
    });

    test('should throw error of password mismatch', async () => {
      const createUserResult = await userService.createUser(createUserDto);

      try {
        await userService.loginUser({
          email: createUserDto.email,
          password: 'invalid',
        });
      } catch (err) {
        const error = err as unknown as HttpException;

        expect(error.message).toEqual('Provided invalid password');
      }

      await userService.deleteUser(createUserResult.user);
    });
  });

  describe('test getCurrentUser service', () => {
    test('should get user data successfully', async () => {
      const createdUserResult = await userService.createUser(createUserDto);

      const currentUserResult = await userService.getCurrentUser({
        username: createdUserResult.user.username,
        password: createdUserResult.user.password,
      });

      expect(currentUserResult.username).toEqual(createUserDto.username);

      await userService.deleteUser(createdUserResult.user);
    });

    test('should throw error of non existent user', async () => {
      try {
        await userService.getCurrentUser({
          username: 'invalid',
          password: 'invalidpassword',
        });
      } catch (err) {
        const error = err as unknown as HttpException;

        expect(error.message).toEqual('Could not find provided user');
      }
    });
  });

  describe('test followUser service', () => {
    test('should successfully follow user', async () => {
      const createdUserResult = await userService.createUser(createUserDto);

      const followUserResult = await userService.followUser(
        createdUserResult.user,
        { username: createdUserResult.user.username, password: 'test' },
      );

      expect(followUserResult.message).toEqual('Followed user');

      await userService.deleteUser(createdUserResult.user);
    });
  });

  describe('test getUserFollowing service', () => {
    test('should get following users', async () => {
      const createdUserResult = await userService.createUser(createUserDto);

      const response = await userService.getUserFollowing(
        createdUserResult.user,
        createdUserResult.token,
      );

      expect(response).toEqual(expect.any(Array));

      await userService.deleteUser(createdUserResult.user);
    });
  });

  describe('test getUserFollowers service', () => {
    test('should get followers users', async () => {
      const createdUserResult = await userService.createUser(createUserDto);

      const response = await userService.getUserFollowers(
        createdUserResult.user,
        createdUserResult.token,
      );

      expect(response).toEqual(expect.any(Array));

      await userService.deleteUser(createdUserResult.user);
    });
  });

  describe('test getCurrentUserSavedPosts service', () => {
    test('should get current user saved posts', async () => {
      const createdUserResult = await userService.createUser(createUserDto);

      const response = await userService.getCurrentUserSavedPosts({
        username: createUserDto.username,
        password: createUserDto.password,
      });

      expect(response).toEqual(expect.any(Array));

      await userService.deleteUser(createdUserResult.user);
    });
  });

  describe('test getUsers service', () => {
    test('should get users', async () => {
      const response = await userService.getUsers();

      expect(response).toEqual(expect.any(Array));
    });
  });

  describe('test getCurrentUserSuggestedUsers service', () => {
    test('should get suggested users', async () => {
      const response = await userService.getCurrentUserSuggestedUsers({
        username: 'test',
        password: 'test',
      });

      expect(response.suggestedUsers).toEqual(expect.any(Array));
    });
  });

  describe('test updateCurrentUserPhoto service', () => {
    test('should update photo', async () => {
      const createdUserResult = await userService.createUser(createUserDto);

      const response = await userService.updateCurrentUserPhoto(filename, {
        password: 'test',
        username: createUserDto.username,
      });

      expect(response.message).toEqual('Profile photo updated');

      await userService.deleteUser(createdUserResult.user);
    });
  });
});
