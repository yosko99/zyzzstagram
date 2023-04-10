import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { PrismaService } from '../../prisma/prisma.service';

import IPost from '../../interfaces/IPost';
import IToken from 'src/interfaces/IToken';

type ExtendedRequest = Request & { post?: IPost; userDataFromToken?: IToken };

@Injectable()
export class CheckExistingPostByIdMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { username } = req.userDataFromToken;
    const { id } = req.params;

    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            username: true,
            imageURL: true,
            _count: {
              select: { followers: true, following: true, posts: true },
            },
          },
        },
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
        comments: {
          select: {
            createdAt: true,
            author: { select: { username: true, imageURL: true } },
            _count: { select: { likedBy: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: { select: { comments: true, likedBy: true } },
      },
    });

    if (post === null) {
      return res.status(404).send({
        message: 'Could not find post with provided ID',
      });
    }

    req.post = {
      ...post,
      likedByUser: post.likedBy?.length > 0,
      savedByUser: post.savedBy?.length > 0,
    };
    next();
  }
}
