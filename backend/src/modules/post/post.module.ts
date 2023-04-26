import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { CheckExistingPostByIdUnpopulated } from '../../middleware/post/checkExistingPostByIdUnpopulated.middleware';
import { CheckExistingPostByIdPopulated } from '../../middleware/post/checkExistingPostByIdPopulated.middleware';
import { CheckIfUploadsFolderExists } from '../../middleware/utils/checkIfUploadsFolderExists.middleware';
import { CheckExistingCommentById } from '../../middleware/post/checkExistingCommentById.middleware';
import { VerifyJWT } from '../../middleware/utils/verifyJWT.middleware';

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
    consumer.apply(VerifyJWT).forRoutes({
      path: '/posts',
      method: RequestMethod.GET,
    });

    consumer.apply(CheckIfUploadsFolderExists, VerifyJWT).forRoutes({
      path: '/posts',
      method: RequestMethod.POST,
    });

    consumer.apply(CheckExistingPostByIdPopulated).forRoutes({
      path: '/posts/:id',
      method: RequestMethod.DELETE,
    });

    consumer
      .apply(
        VerifyJWT,
        CheckExistingCommentById,
        CheckExistingPostByIdUnpopulated,
      )
      .forRoutes({
        path: '/posts/:id/comments/:commentId/likes',
        method: RequestMethod.POST,
      });

    consumer.apply(VerifyJWT, CheckExistingPostByIdPopulated).forRoutes(
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
