import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CheckExistingUserById } from '../../middleware/user/checkExistingUserByID.middleware';
import { CheckIfUploadsFolderExists } from '../../middleware/utils/checkIfUploadsFolderExists.middleware';

import { PrismaService } from '../../prisma/prisma.service';
import { UserServiceImpl } from './user.service.impl';

import { UserController } from './user.controller';
import { CheckExistingUserByUsername } from 'src/middleware/user/checkExistingUserByUsername.middleware';
import { VerifyJWT } from 'src/middleware/utils/verifyJWT.middleware';
import { NotificationServiceImpl } from '../notification/notification.service.impl';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: UserService,
      useClass: UserServiceImpl,
    },
    PrismaService,
    NotificationServiceImpl,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIfUploadsFolderExists).forRoutes({
      path: '/users',
      method: RequestMethod.POST,
    });

    consumer.apply(CheckIfUploadsFolderExists, VerifyJWT).forRoutes({
      path: '/users/current/photo',
      method: RequestMethod.PUT,
    });

    consumer.apply(CheckExistingUserById).forRoutes({
      path: '/users/:id',
      method: RequestMethod.DELETE,
    });

    consumer.apply(VerifyJWT).forRoutes(
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
      {
        path: '/users/current/suggested',
        method: RequestMethod.GET,
      },
    );

    consumer.apply(VerifyJWT, CheckExistingUserByUsername).forRoutes(
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
