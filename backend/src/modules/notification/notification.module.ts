import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { NotificationController } from './notification.controller';

import { CheckExistingNotificationById } from '../../middleware/notification/checkExistingNotificationById.middleware';
import { VerifyJWT } from '../../middleware/utils/verifyJWT.middleware';

import { NotificationServiceImpl } from './notification.service.impl';
import { NotificationService } from './notification.service';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [
    { provide: NotificationService, useClass: NotificationServiceImpl },
    PrismaService,
  ],
})
export class NotificationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes(
      {
        path: '/notifications',
        method: RequestMethod.GET,
      },
      {
        path: '/notifications/read',
        method: RequestMethod.PUT,
      },
    );

    consumer.apply(CheckExistingNotificationById).forRoutes({
      path: '/notifications/:id',
      method: RequestMethod.DELETE,
    });
  }
}
