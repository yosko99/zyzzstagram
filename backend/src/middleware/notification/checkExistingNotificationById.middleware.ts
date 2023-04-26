import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { PrismaService } from '../../prisma/prisma.service';

import INotification from '../../interfaces/INotification';

type ExtendedRequest = Request & { notification: INotification };

@Injectable()
export class CheckExistingNotificationById implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { id } = req.params;

    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (notification === null) {
      return res.status(404).send({
        message: 'Could not find notification with provided ID',
      });
    }

    req.notification = notification;

    next();
  }
}
