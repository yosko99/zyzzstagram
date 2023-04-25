import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { CheckExistingPostByIdMiddlewareUnpopulated } from '../../middleware/post/checkExistingPostByIdUnpopulated.middleware';
import { CheckExistingPostByIdMiddlewarePopulated } from '../../middleware/post/checkExistingPostByIdPopulated.middleware';
import { CheckIfUploadsFolderExistsMiddleware } from '../../middleware/utils/checkIfUploadsFolderExists.middleware';
import { CheckExistingCommentByIdMiddleware } from '../../middleware/post/checkExistingCommentById.middleware';
import { VerifyJWTMiddleware } from '../../middleware/utils/verifyJWT.middleware';

import { NotificationService } from '../notification/notification.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PostService } from './post.service';

import { PostController } from './post.controller';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PrismaService, NotificationService],
  exports: [PostService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWTMiddleware).forRoutes({
      path: '/posts',
      method: RequestMethod.GET,
    });

    consumer
      .apply(CheckIfUploadsFolderExistsMiddleware, VerifyJWTMiddleware)
      .forRoutes({
        path: '/posts',
        method: RequestMethod.POST,
      });

    consumer.apply(CheckExistingPostByIdMiddlewarePopulated).forRoutes({
      path: '/posts/:id',
      method: RequestMethod.DELETE,
    });

    consumer
      .apply(
        VerifyJWTMiddleware,
        CheckExistingCommentByIdMiddleware,
        CheckExistingPostByIdMiddlewareUnpopulated,
      )
      .forRoutes({
        path: '/posts/:id/comments/:commentId/likes',
        method: RequestMethod.POST,
      });

    consumer
      .apply(VerifyJWTMiddleware, CheckExistingPostByIdMiddlewarePopulated)
      .forRoutes(
        {
          path: '/posts/:id/likes',
          method: RequestMethod.POST,
        },
        {
          path: '/posts/:id/comments',
          method: RequestMethod.POST,
        },
        {
          path: '/posts/:id',
          method: RequestMethod.GET,
        },
        {
          path: '/posts/:id/saved-by',
          method: RequestMethod.POST,
        },
      );
  }
}
