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

import { NotificationServiceImpl } from '../notification/notification.service.impl';
import { PrismaService } from '../../prisma/prisma.service';
import { PostServiceImpl } from './post.service.impl';

import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [
    { provide: PostService, useClass: PostServiceImpl },
    PrismaService,
    NotificationServiceImpl,
  ],
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

    consumer.apply(VerifyJWT).forRoutes({
      path: '/posts/:id/liked-by',
      method: RequestMethod.GET,
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
