/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaService } from '../../../prisma/prisma.service';
import { UserService } from '../../user/user.service';

import { createUserForNotificationDto } from '../../../dto/mock/user.mock';
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
    const createdUser = await userService.createUser(
      createUserForNotificationDto,
      filename,
    );

    const tokenData: IToken = {
      username: createUserForNotificationDto.username,
      password: createUserForNotificationDto.password,
    };

    const createdPost = await postService.createPost(
      createPostDto,
      filename,
      tokenData,
    );

    return { createdUser, tokenData, createdPost };
  };

  describe('test createLikeNotification service', () => {
    it('should create notification successfully with liked post', async () => {
      const { createdUser, createdPost, tokenData } = await initMockData();

      const createdNotification =
        await notificationService.createLikeNotification(
          {
            likedByUser: true,
            postId: createdPost.post.id,
          },
          tokenData,
        );

      expect(createdNotification.message).toEqual('Like notification created');
      expect(createdNotification.notification.message).toEqual(
        `${createdUser.user.username} liked your post.`,
      );
      expect(createdNotification.notification).toBeTruthy();

      await userService.deleteUser(createdUser.user);
    });

    it('should create notification successfully with unliked post', async () => {
      const { createdUser, createdPost, tokenData } = await initMockData();

      const createdNotification =
        await notificationService.createLikeNotification(
          {
            likedByUser: false,
            postId: createdPost.post.id,
          },
          tokenData,
        );

      expect(createdNotification.message).toEqual('Like notification created');
      expect(createdNotification.notification.message).toEqual(
        `${createdUser.user.username} unliked your post.`,
      );
      expect(createdNotification.notification).toBeTruthy();

      await userService.deleteUser(createdUser.user);
    });
  });

  describe('test createCommentNotification service', () => {
    it('should create notification successfully', async () => {
      const { createdUser, createdPost, tokenData } = await initMockData();

      const createdNotification =
        await notificationService.createCommentNotification(
          {
            comment: 'test comment',
            postId: createdPost.post.id,
          },
          tokenData,
        );

      expect(createdNotification.message).toEqual(
        'Comment notification created',
      );
      expect(createdNotification.notification).toBeTruthy();

      await userService.deleteUser(createdUser.user);
    });
  });

  describe('test deleteNotification service', () => {
    it('should delete notification successfully', async () => {
      const { createdUser, createdPost, tokenData } = await initMockData();

      const createdNotification =
        await notificationService.createCommentNotification(
          {
            comment: 'test comment',
            postId: createdPost.post.id,
          },
          tokenData,
        );

      const result = await notificationService.deleteNotification(
        createdNotification.notification,
      );

      expect(result.message).toEqual('Notification deleted');

      await userService.deleteUser(createdUser.user);
    });
  });
});
