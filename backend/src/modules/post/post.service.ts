import { Injectable } from '@nestjs/common';

import { CreatePostDto } from '../../dto/CreatePostDto';

import IToken from '../../interfaces/IToken';

import { PrismaService } from '../../prisma/prisma.service';

import IPost from '../../interfaces/IPost';

import deleteImage from '../../functions/deleteImage';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

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
      include: { likedBy: true },
    });

    return {
      message: 'Post created successfully',
      post: newPost,
    };
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
      },
      orderBy: { createdAt: 'desc' },
    });

    return posts.map((post) => ({
      ...post,
      likedByUser: post.likedBy.length > 0,
    }));
  }

  async likePost({ username }: IToken, post: IPost) {
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
      message: 'Post liked',
    };
  }
}
