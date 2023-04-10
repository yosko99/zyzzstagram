import { Injectable } from '@nestjs/common';

import { CreatePostDto } from '../../dto/post.dto';

import IToken from '../../interfaces/IToken';

import { PrismaService } from '../../prisma/prisma.service';

import IPost from '../../interfaces/IPost';

import deleteImage from '../../functions/deleteImage';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  async createPost(
    { description }: CreatePostDto,
    filename: string,
    tokenData: IToken,
  ) {
    const newPost = await this.prisma.post.create({
      data: {
        imageURL: filename,
        description,
        published: true,
        author: { connect: { username: tokenData.username } },
      },
      include: { likedBy: true, savedBy: true },
    });

    return {
      message: 'Post created successfully',
      post: newPost,
    };
  }

  getPostById(post: IPost) {
    return post;
  }

  async deletePost(post: IPost) {
    await this.prisma.comment.deleteMany({ where: { postId: post.id } });
    await this.prisma.post.delete({ where: { id: post.id } });
    deleteImage(post.imageURL);

    return {
      message: 'Post deleted successfully',
    };
  }

  async getAllPosts({ username }: IToken) {
    const posts = await this.prisma.post.findMany({
      include: {
        author: { select: { username: true, imageURL: true } },
        _count: { select: { comments: true, likedBy: true } },
        comments: true,
        likedBy: {
          where: {
            username,
          },
          select: {
            id: true,
          },
        },
        savedBy: {
          where: { username },
          select: { username: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return posts.map((post) => ({
      ...post,
      likedByUser: post.likedBy.length > 0,
      savedByUser: post.savedBy.length > 0,
    }));
  }

  async likePost(post: IPost, { username }: IToken) {
    if (post.likedBy.some((user) => user.username === username)) {
      await this.prisma.post.update({
        where: { id: post.id },
        data: { likedBy: { disconnect: { username } } },
      });

      this.notificationService.createLikeNotification(false, post.id, username);

      return {
        message: 'Removed like',
      };
    }

    await this.prisma.post.update({
      where: { id: post.id },
      data: { likedBy: { connect: { username } } },
    });

    this.notificationService.createLikeNotification(true, post.id, username);

    return {
      message: 'Post liked',
    };
  }

  async commentPost(post: IPost, content: string, { username }: IToken) {
    await this.prisma.post.update({
      where: { id: post.id },
      data: {
        comments: { create: { content, author: { connect: { username } } } },
      },
    });

    await this.notificationService.createCommentNotification(post.id, username);

    return {
      message: 'Comment created',
    };
  }

  async savePost(post: IPost, tokenData: IToken) {
    if (post.savedBy.some((user) => user.username === tokenData.username)) {
      await this.prisma.user.update({
        where: { username: tokenData.username },
        data: { savedPosts: { disconnect: { id: post.id } } },
      });

      return { message: 'Post unsaved' };
    }

    await this.prisma.user.update({
      where: { username: tokenData.username },
      data: { savedPosts: { connect: { id: post.id } } },
    });

    return { message: 'Post saved' };
  }
}
