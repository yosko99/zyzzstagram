/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NotificationService } from '../../../modules/notification/notification.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserService } from '../../user/user.service';
import { PostService } from '../post.service';

import { createUserForPostDto } from '../../../dto/mock/user.mock';
import { createPostDto } from '../../../dto/mock/post.mock';

import IToken from '../../../interfaces/IToken';

describe('Test posts API', () => {
  const prisma = new PrismaService();
  const notificationService = new NotificationService(prisma);
  const postService = new PostService(prisma, notificationService);
  const userService = new UserService(prisma);

  const initMockData = async () => {
    const createdUser = await userService.createUser(
      createUserForPostDto,
      filename,
    );

    const tokenData: IToken = {
      username: createUserForPostDto.username,
      password: createUserForPostDto.password,
    };

    const createdPost = await postService.createPost(
      createPostDto,
      filename,
      tokenData,
    );

    return { createdUser, tokenData, createdPost };
  };

  const filename = 'testimage.jpg';

  describe('test createPost service', () => {
    it('should create a post successfully', async () => {
      const { createdPost, createdUser } = await initMockData();

      expect(createdPost.message).toEqual('Post created successfully');
      expect(createdPost.post).toBeTruthy();

      await userService.deleteUser(createdUser.user);
    });

    it('should return an error if input is invalid', async () => {
      await expect(
        // @ts-ignore
        postService.createPost(),
      ).rejects.toThrow(TypeError);
    });

    it('should return an error when not provided token data', async () => {
      await expect(
        // @ts-ignore
        postService.createPost({ description: '' }),
      ).rejects.toThrow(TypeError);
    });
  });

  describe('test deletePost service', () => {
    it('should delete a post successfully', async () => {
      const { createdPost, createdUser } = await initMockData();

      const deletedPost = await postService.deletePost(createdPost.post);

      expect(deletedPost.message).toEqual('Post deleted successfully');

      await userService.deleteUser(createdUser.user);
    });
  });

  describe('test getAllPosts service', () => {
    it('should get posts', async () => {
      const response = await postService.getAllPosts({
        username: 'username',
        password: 'password',
      });

      expect(response).toEqual(expect.any(Array));
    });
  });

  describe('test likePost service', () => {
    it('should successfully like a post', async () => {
      const { createdPost, createdUser, tokenData } = await initMockData();

      const result = await postService.likePost(tokenData, createdPost.post);

      expect(result.message).toBe('Post liked');

      await userService.deleteUser(createdUser.user);
    });
  });
});
