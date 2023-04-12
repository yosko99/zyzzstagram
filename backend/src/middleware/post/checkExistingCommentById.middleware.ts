import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { PrismaService } from '../../prisma/prisma.service';

import IToken from '../../interfaces/IToken';
import IComment from '../../interfaces/IComment';

type ExtendedRequest = Request & {
  comment?: IComment;
  userDataFromToken?: IToken;
};

@Injectable()
export class CheckExistingCommentByIdMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { username } = req.userDataFromToken;
    const { commentId } = req.params;

    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      select: {
        likedBy: {
          where: {
            username,
          },
          select: {
            username: true,
          },
        },
        id: true,
      },
    });

    if (comment === null) {
      return res.status(404).send({
        message: 'Could not find comment with provided ID',
      });
    }

    req.comment = comment;
    next();
  }
}
