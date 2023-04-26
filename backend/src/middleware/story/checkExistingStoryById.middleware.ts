import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { PrismaService } from '../../prisma/prisma.service';

import IStory from '../../interfaces/IStory';
import IToken from '../../interfaces/IToken';

type ExtendedRequest = Request & { story?: IStory; userDataFromToken?: IToken };

@Injectable()
export class CheckExistingStoryById implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { username } = req.userDataFromToken;
    const { id } = req.params;

    const story = await this.prisma.story.findUnique({
      where: { id },
      select: {
        imageURL: true,
        id: true,
        createdAt: true,
        likedBy: {
          where: {
            username,
          },
          select: {
            username: true,
          },
        },
      },
    });

    if (story === null) {
      return res.status(404).send({
        message: 'Could not find story with provided ID',
      });
    }

    req.story = story;

    next();
  }
}
