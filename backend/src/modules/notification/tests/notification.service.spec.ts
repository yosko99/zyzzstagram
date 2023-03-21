/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaService } from '../../../prisma/prisma.service';
import { UserService } from '../../user/user.service';

import {
  createFirstUserForNotificationDto,
  createSecondUserForNotificationDto,
} from '../../../dto/mock/user.mock';
import { createPostDto } from '../../../dto/mock/post.mock';

import IToken from '../../../interfaces/IToken';

import { NotificationService } from '../notification.service';
import { PostService } from '../../../modules/post/post.service';

describe('Test notifications API', () => {
  const prisma = new PrismaService();
  const notificationService = new NotificationService(prisma);
  const postService = new PostService(prisma);
  const userService = new UserService(prisma);
  const filename = 'testimage.jpg';

  const initMockData = async () => {
    const createdFirstUser = await userService.createUser(
      createFirstUserForNotificationDto,
      filename,
    );

    const createdSecondUser = await userService.createUser(
      createSecondUserForNotificationDto,
      filename,
    );

    const firstUserTokenData: IToken = {
      username: createFirstUserForNotificationDto.username,
      password: createFirstUserForNotificationDto.password,
    };

    const secondUserTokenData: IToken = {
      username: createSecondUserForNotificationDto.username,
      password: createSecondUserForNotificationDto.password,
    };

    const createdPost = await postService.createPost(
      createPostDto,
      filename,
      firstUserTokenData,
    );

    return {
      createdFirstUser,
      firstUserTokenData,
      createdSecondUser,
      secondUserTokenData,
      createdPost,
    };
  };

  describe('test createLikeNotification service', () => {
    it('should create notification successfully with liked post', async () => {
      const {
        createdFirstUser,
        createdSecondUser,
        secondUserTokenData,
        createdPost,
      } = await initMockData();

      const createdNotification =
        await notificationService.createLikeNotification(
          {
            likedByUser: true,
            postId: createdPost.post.id,
          },
          secondUserTokenData,
        );

      expect(createdNotification.message).toEqual('Like notification created');
      expect(createdNotification.notification.message).toEqual(
        `${createdSecondUser.user.username} liked your post.`,
      );
      expect(createdNotification.notification).toBeTruthy();

      await userService.deleteUser(createdFirstUser.user);
      await userService.deleteUser(createdSecondUser.user);
    });

    it('should create notification successfully with unliked post', async () => {
      const {
        createdFirstUser,
        createdSecondUser,
        secondUserTokenData,
        createdPost,
      } = await initMockData();

      const createdNotification =
        await notificationService.createLikeNotification(
          {
            likedByUser: false,
            postId: createdPost.post.id,
          },
          secondUserTokenData,
        );

      expect(createdNotification.message).toEqual('Like notification created');
      expect(createdNotification.notification.message).toEqual(
        `${createdSecondUser.user.username} unliked your post.`,
      );
      expect(createdNotification.notification).toBeTruthy();

      await userService.deleteUser(createdFirstUser.user);
      await userService.deleteUser(createdSecondUser.user);
    });

    it('should receive "no action needed"', async () => {
      const {
        createdFirstUser,
        createdSecondUser,
        firstUserTokenData,
        createdPost,
      } = await initMockData();

      const createdNotification =
        await notificationService.createLikeNotification(
          {
            likedByUser: false,
            postId: createdPost.post.id,
          },
          firstUserTokenData,
        );

      expect(createdNotification.message).toEqual(
        'No action needed (same user)',
      );

      await userService.deleteUser(createdFirstUser.user);
      await userService.deleteUser(createdSecondUser.user);
    });
  });

  describe('test createCommentNotification service', () => {
    it('should create notification successfully', async () => {
      const {
        createdFirstUser,
        createdSecondUser,
        secondUserTokenData,
        createdPost,
      } = await initMockData();

      const createdNotification =
        await notificationService.createCommentNotification(
          {
            comment: 'test comment',
            postId: createdPost.post.id,
          },
          secondUserTokenData,
        );

      expect(createdNotification.message).toEqual(
        'Comment notification created',
      );
      expect(createdNotification.notification).toBeTruthy();

      await userService.deleteUser(createdSecondUser.user);
      await userService.deleteUser(createdFirstUser.user);
    });

    it('should receive "no action needed"', async () => {
      const {
        createdFirstUser,
        createdSecondUser,
        firstUserTokenData,
        createdPost,
      } = await initMockData();

      const createdNotification =
        await notificationService.createCommentNotification(
          {
            comment: 'test comment',
            postId: createdPost.post.id,
          },
          firstUserTokenData,
        );

      expect(createdNotification.message).toEqual(
        'No action needed (same user)',
      );

      await userService.deleteUser(createdSecondUser.user);
      await userService.deleteUser(createdFirstUser.user);
    });
  });

  describe('test deleteNotification service', () => {
    it('should delete notification successfully', async () => {
      const {
        createdFirstUser,
        createdSecondUser,
        secondUserTokenData,
        createdPost,
      } = await initMockData();

      const createdNotification =
        await notificationService.createCommentNotification(
          {
            comment: 'test comment',
            postId: createdPost.post.id,
          },
          secondUserTokenData,
        );

      const result = await notificationService.deleteNotification(
        createdNotification.notification,
      );

      expect(result.message).toEqual('Notification deleted');

      await userService.deleteUser(createdSecondUser.user);
      await userService.deleteUser(createdFirstUser.user);
    });
  });

  describe('test getCurrentUserNotifications service', () => {
    it('should get notifications', async () => {
      const response = await notificationService.getCurrentUserNotifications({
        username: 'username',
        password: 'password',
      });

      expect(response).toEqual(expect.any(Array));
    });
  });
});
