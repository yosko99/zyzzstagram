import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { PrismaService } from '../../prisma/prisma.service';

import IUser from '../../interfaces/IUser';

type ExtendedRequest = Request & { user: IUser };

@Injectable()
export class CheckExistingUserByUsernameMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { username } = req.params;

    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        username: true,
        imageURL: true,
        description: true,
        following: true,
        followers: true,
        posts: {
          select: {
            imageURL: true,
            id: true,
            _count: { select: { comments: true, likedBy: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: { select: { followers: true, following: true, posts: true } },
      },
    });

    if (user === null) {
      return res.status(404).send({
        message: 'Could not find user with provided username',
      });
    }

    req.user = user;

    next();
  }
}
