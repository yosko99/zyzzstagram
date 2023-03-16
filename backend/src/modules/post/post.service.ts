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
        author: { connect: { email: tokenData.email } },
      },
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
}
