import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreatePostDto } from '../../dto/post.dto';

import { NotificationService } from '../notification/notification.service';
import { PrismaService } from '../../prisma/prisma.service';

import IComment from '../../interfaces/IComment';
import IToken from '../../interfaces/IToken';
import IPost from '../../interfaces/IPost';

import appendLikeAndSaveToPosts from '../../functions/post/appendLikeAndSavedToPosts';
import deleteImage from '../../functions/deleteImage';

import PostsType from '../../types/posts.type';

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
    await this.prisma.post.delete({ where: { id: post.id } });
    deleteImage(post.imageURL);

    return {
      message: 'Post deleted successfully',
    };
  }

  async getPosts({ username }: IToken, postsType?: PostsType) {
    switch (postsType) {
      case 'explore':
        return this.getExplorePosts();
      case 'following':
        return this.getFollowingPosts(username);
      default:
        return this.getAllPosts(username);
    }
  }

  private async getFollowingPosts(username: string) {
    const postSelectQuery: Prisma.PostSelect = {
      savedBy: {
        where: {
          username,
        },
        select: { username: true },
      },
      likedBy: {
        where: {
          username,
        },
        select: {
          username: true,
        },
      },
      id: true,
      imageURL: true,
      _count: {
        select: {
          likedBy: true,
          comments: true,
        },
      },
      description: true,
      createdAt: true,
      author: {
        select: {
          username: true,
          imageURL: true,
        },
      },
    };

    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        following: {
          include: {
            posts: {
              select: postSelectQuery,
              orderBy: { createdAt: 'desc' },
            },
          },
        },
        posts: {
          select: postSelectQuery,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    const userPosts = appendLikeAndSaveToPosts(user.posts);
    const followingPosts = user.following.flatMap((follower) => {
      return appendLikeAndSaveToPosts(follower.posts);
    });

    return [...followingPosts, ...userPosts].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
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

    return appendLikeAndSaveToPosts(posts);
  }

  async likePost(post: IPost, { username }: IToken) {
    await this.notificationService.createLikeNotification(
      post.id,
      username,
      'post',
    );

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
    await this.notificationService.createLikeNotification(
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
          orderBy: { createdAt: 'desc' },
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
