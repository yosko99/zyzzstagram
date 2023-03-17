import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CheckExistingPostByIdMiddleware } from 'src/middleware/post/checkExistingPostById.middleware';
import { VerifyJWTMiddleware } from 'src/middleware/utils/verifyJWT.middleware';

import { PrismaService } from '../../prisma/prisma.service';

import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PrismaService],
  exports: [PostService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWTMiddleware).forRoutes({
      path: '/posts',
      method: RequestMethod.POST,
    });
    consumer.apply(CheckExistingPostByIdMiddleware).forRoutes({
      path: '/posts/:id',
      method: RequestMethod.DELETE,
    });
  }
}