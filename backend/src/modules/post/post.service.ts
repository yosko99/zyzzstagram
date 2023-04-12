import { Injectable } from '@nestjs/common';

import { CreatePostDto } from '../../dto/post.dto';

import { NotificationService } from '../notification/notification.service';
import { PrismaService } from '../../prisma/prisma.service';

import IComment from '../../interfaces/IComment';
import IToken from '../../interfaces/IToken';
import IPost from '../../interfaces/IPost';

import deleteImage from '../../functions/deleteImage';

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

  async getPosts({ username }: IToken, explore?: 'true' | 'false') {
    if (explore !== undefined && explore === 'true') {
      return this.getExplorePosts();
    }

    return this.getAllPosts(username);
  }

  private async getAllPosts(username: string) {
    const posts = await this.prisma.post.findMany({
      include: {
        author: { select: { username: true, imageURL: true } },
        _count: { select: { comments: true, likedBy: true } },
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
    this.notificationService.createLikeNotification(post.id, username, 'post');

    if (post.likedBy.some((user) => user.username === username)) {
      await this.prisma.post.update({
        where: { id: post.id },
        data: { likedBy: { disconnect: { username } } },
      });

      return {
        message: 'Removed like',
      };
    }

    await this.prisma.post.update({
      where: { id: post.id },
      data: { likedBy: { connect: { username } } },
    });

    return {
      message: 'Liked post',
    };
  }

  async likeComment(comment: IComment, { username }: IToken) {
    this.notificationService.createLikeNotification(
      comment.id,
      username,
      'comment',
    );

    if (comment.likedBy.some((user) => user.username === username)) {
      await this.prisma.comment.update({
        where: { id: comment.id },
        data: { likedBy: { disconnect: { username } } },
      });

      return {
        message: 'Removed like',
      };
    }

    await this.prisma.comment.update({
      where: { id: comment.id },
      data: { likedBy: { connect: { username } } },
    });

    return {
      message: 'Comment liked',
    };
  }

  async commentPost(post: IPost, content: string, { username }: IToken) {
    const newComment = await this.prisma.comment.create({
      data: {
        content,
        author: {
          connect: { username },
        },
        post: {
          connect: { id: post.id },
        },
      },
    });

    await this.prisma.post.update({
      where: { id: post.id },
      data: {
        comments: {
          connect: {
            id: newComment.id,
          },
        },
      },
    });

    await this.notificationService.createCommentNotification(
      post.id,
      newComment.id,
      username,
    );

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

  private async getExplorePosts() {
    const usersWithFirstPosts = await this.prisma.user.findMany({
      include: {
        posts: {
          orderBy: { createdAt: 'asc' },
          take: 1,
          select: {
            imageURL: true,
            id: true,
            _count: { select: { comments: true, likedBy: true } },
          },
        },
      },
    });

    const reels = [];

    for (let i = 0; i < usersWithFirstPosts.length; i++) {
      const post = usersWithFirstPosts[i].posts[0];

      if (post !== undefined) {
        reels.push({
          id: post.id,
          imageURL: post.imageURL,
          _count: post._count,
        });
      }
    }

    return reels;
  }
}
