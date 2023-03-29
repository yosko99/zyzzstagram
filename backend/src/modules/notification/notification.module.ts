import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from './notification.service';

import { NotificationController } from './notification.controller';

import { CheckExistingNotificationByIdMiddleware } from '../../middleware/notification/checkExistingNotificationById.middleware';
import { VerifyJWTMiddleware } from '../../middleware/utils/verifyJWT.middleware';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService],
  exports: [NotificationService],
})
export class NotificationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWTMiddleware).forRoutes(
      {
        path: '/notifications',
        method: RequestMethod.GET,
      },
      {
        path: '/notifications/read',
        method: RequestMethod.PUT,
      },
    );

    consumer.apply(CheckExistingNotificationByIdMiddleware).forRoutes({
      path: '/notifications/:id',
      method: RequestMethod.DELETE,
    });
  }
}
