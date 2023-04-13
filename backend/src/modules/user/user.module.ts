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
import { VerifyJWTMiddleware } from 'src/middleware/utils/verifyJWT.middleware';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, NotificationService],
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

    consumer.apply(VerifyJWTMiddleware).forRoutes(
      {
        path: '/users/current',
        method: RequestMethod.GET,
      },
      {
        path: '/users/current/saved-posts',
        method: RequestMethod.GET,
      },
      {
        path: '/users',
        method: RequestMethod.GET,
      },
    );

    consumer
      .apply(VerifyJWTMiddleware, CheckExistingUserByUsernameMiddleware)
      .forRoutes(
        {
          path: '/users/:username/followers',
          method: RequestMethod.POST,
        },
        {
          path: '/users/:username/user',
          method: RequestMethod.GET,
        },
        {
          path: '/users/:username/followers',
          method: RequestMethod.GET,
        },
        {
          path: '/users/:username/following',
          method: RequestMethod.GET,
        },
      );
  }
}
