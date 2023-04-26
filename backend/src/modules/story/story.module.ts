import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { CheckIfUploadsFolderExists } from 'src/middleware/utils/checkIfUploadsFolderExists.middleware';
import { CheckExistingStoryById } from '../../middleware/story/checkExistingStoryById.middleware';
import { VerifyJWT } from '../../middleware/utils/verifyJWT.middleware';

import { StoryController } from './story.controller';

import { NotificationService } from '../notification/notification.service';
import { PrismaService } from '../../prisma/prisma.service';
import { StoryService } from './story.service';

@Module({
  imports: [],
  controllers: [StoryController],
  providers: [StoryService, PrismaService, NotificationService],
  exports: [StoryService],
})
export class StoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes({
      path: '/stories',
      method: RequestMethod.GET,
    });

    consumer.apply(VerifyJWT, CheckExistingStoryById).forRoutes({
      path: '/stories/:id/likes',
      method: RequestMethod.POST,
    });

    consumer.apply(CheckIfUploadsFolderExists, VerifyJWT).forRoutes({
      path: '/stories',
      method: RequestMethod.POST,
    });
  }
}
