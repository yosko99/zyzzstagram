import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { VerifyJWTMiddleware } from 'src/middleware/utils/verifyJWT.middleware';

import { PrismaService } from '../../prisma/prisma.service';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
  exports: [PostsService],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWTMiddleware).forRoutes({
      path: '/posts',
      method: RequestMethod.POST,
    });
  }
}
