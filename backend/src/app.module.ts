import { Module } from '@nestjs/common';

import { GlobalExceptionFilter } from './filters/globalException.filter';

import { NotificationModule } from './modules/notification/notification.module';
import { StoryModule } from './modules/story/story.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';

import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [UserModule, PostModule, NotificationModule, StoryModule],
  controllers: [],
  providers: [SocketGateway, GlobalExceptionFilter],
})
export class AppModule {}
