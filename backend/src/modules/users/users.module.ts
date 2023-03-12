import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CheckExistingUserByIdMiddleware } from '../../middleware/user/checkExistingUserByID.middleware';
import { CheckIfUploadsFolderExistsMiddleware } from '../../middleware/utils/checkIfUploadsFolderExists.middleware';

import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from './users.service';

import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIfUploadsFolderExistsMiddleware).forRoutes({
      path: '/users',
      method: RequestMethod.POST,
    });

    consumer.apply(CheckExistingUserByIdMiddleware).forRoutes({
      path: '/users/:id',
      method: RequestMethod.DELETE,
    });
  }
}
