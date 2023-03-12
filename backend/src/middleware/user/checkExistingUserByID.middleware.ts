import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { PrismaService } from '../../prisma/prisma.service';

import IUser from '../../interfaces/IUser';

type ExtendedRequest = Request & { user: IUser };

@Injectable()
export class CheckExistingUserByIdMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { id } = req.params;

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (user === null) {
      return res.status(404).send({
        message: 'Could not find user with provided ID',
        statusCode: 404,
      });
    }

    req.user = user;

    next();
  }
}
