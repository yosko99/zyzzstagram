import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CheckExistingUserByIdMiddleware } from '../../middleware/user/checkExistingUserByID.middleware';
import { CheckIfUploadsFolderExistsMiddleware } from '../../middleware/utils/checkIfUploadsFolderExists.middleware';

import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from './user.service';

import { UserController } from './user.controller';
import { CheckExistingUserByUsernameMiddleware } from 'src/middleware/user/checkExistingUserByUsername.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIfUploadsFolderExistsMiddleware).forRoutes({
      path: '/users',
      method: RequestMethod.POST,
    });

    consumer.apply(CheckExistingUserByIdMiddleware).forRoutes({
      path: '/users/:id',
      method: RequestMethod.DELETE,
    });

    consumer.apply(CheckExistingUserByUsernameMiddleware).forRoutes({
      path: '/users/:username',
      method: RequestMethod.GET,
    });
  }
}
