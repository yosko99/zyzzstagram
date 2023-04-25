import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { CheckIfUploadsFolderExistsMiddleware } from 'src/middleware/utils/checkIfUploadsFolderExists.middleware';
import { VerifyJWTMiddleware } from '../../middleware/utils/verifyJWT.middleware';

import { StoryController } from './story.controller';

import { PrismaService } from '../../prisma/prisma.service';
import { StoryService } from './story.service';

@Module({
  imports: [],
  controllers: [StoryController],
  providers: [StoryService, PrismaService],
  exports: [StoryService],
})
export class StoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWTMiddleware).forRoutes({
      path: '/stories',
      method: RequestMethod.GET,
    });

    consumer
      .apply(CheckIfUploadsFolderExistsMiddleware, VerifyJWTMiddleware)
      .forRoutes({
        path: '/stories',
        method: RequestMethod.POST,
      });
  }
}
