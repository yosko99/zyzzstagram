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
  const userService = new UserService(prisma, notificationService);

  const initMockData = async () => {
    const createdUser = await userService.createUser(createUserForPostDto);

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
    it('should get all posts', async () => {
      const response = await postService.getPosts({
        username: 'username',
        password: 'password',
      });

      expect(response).toEqual(expect.any(Array));
    });

    it('should get explore posts', async () => {
      const response = await postService.getPosts(
        {
          username: 'username',
          password: 'password',
        },
        'explore',
      );

      expect(response).toEqual(expect.any(Array));
    });

    it('should get following users posts', async () => {
      const { createdUser } = await initMockData();
      const response = await postService.getPosts(
        {
          username: createdUser.user.username,
          password: createdUser.user.password,
        },
        'following',
      );

      expect(response).toEqual(expect.any(Array));

      await userService.deleteUser(createdUser.user);
    });
  });

  describe('test likePost service', () => {
    it('should successfully like a post', async () => {
      const { createdPost, createdUser, tokenData } = await initMockData();

      const result = await postService.likePost(createdPost.post, tokenData);

      expect(result.message).toBe('Liked post');

      await userService.deleteUser(createdUser.user);
    });
  });

  describe('test likeComment service', () => {
    it('should successfully like a comment', async () => {
      const { createdPost, createdUser, tokenData } = await initMockData();

      const comment = await prisma.comment.create({
        data: {
          post: { connect: { id: createdPost.post.id } },
          content: 'test',
          author: { connect: { id: createdUser.user.id } },
        },
        select: { likedBy: true, author: true, id: true },
      });

      const result = await postService.likeComment(comment, tokenData);

      expect(result.message).toBe('Comment liked');

      await userService.deleteUser(createdUser.user);
    });
  });

  describe('test commentPost service', () => {
    it('should successfully create comment', async () => {
      const { createdPost, createdUser, tokenData } = await initMockData();

      const result = await postService.commentPost(
        createdPost.post,
        'test',
        tokenData,
      );

      expect(result.message).toEqual('Comment created');

      await userService.deleteUser(createdUser.user);
    });
  });

  describe('test savePost service', () => {
    test('should save post', async () => {
      const { createdPost, createdUser, tokenData } = await initMockData();

      const savePostResponse = await postService.savePost(
        createdPost.post,
        tokenData,
      );

      expect(savePostResponse.message).toEqual('Post saved');

      await userService.deleteUser(createdUser.user);
    });

    test('should remove post from saved', async () => {
      const { createdPost, createdUser, tokenData } = await initMockData();

      createdPost.post = {
        ...createdPost.post,
        savedBy: [{ ...createUserForPostDto }],
      };

      const savePostResponse = await postService.savePost(
        createdPost.post,
        tokenData,
      );

      expect(savePostResponse.message).toEqual('Post unsaved');

      await userService.deleteUser(createdUser.user);
    });
  });
});
