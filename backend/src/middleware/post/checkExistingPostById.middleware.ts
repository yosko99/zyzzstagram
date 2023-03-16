import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { PrismaService } from '../../prisma/prisma.service';

import IPost from '../../interfaces/IPost';

type ExtendedRequest = Request & { post?: IPost };

@Injectable()
export class CheckExistingPostByIdMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { id } = req.params;

    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });

    if (post === null) {
      return res.status(404).send({
        message: 'Could not find post with provided ID',
      });
    }

    req.post = post;

    next();
  }
}
