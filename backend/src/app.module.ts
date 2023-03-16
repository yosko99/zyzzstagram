import { Module } from '@nestjs/common';

import { GlobalExceptionFilter } from './filters/globalException.filter';

import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';

import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [],
  providers: [SocketGateway, GlobalExceptionFilter],
})
export class AppModule {}
