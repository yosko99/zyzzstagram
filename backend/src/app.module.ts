import { Module } from '@nestjs/common';

import { GlobalExceptionFilter } from './filters/globalException.filter';

import { NotificationModule } from './modules/notification/notification.module';
import { StoryModule } from './modules/story/story.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';

import { SocketGateway } from './modules/socket/socket.gateway';
import { TaskModule } from './modules/tasks/task.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    NotificationModule,
    StoryModule,
    TaskModule,
  ],
  controllers: [],
  providers: [SocketGateway, GlobalExceptionFilter],
})
export class AppModule {}
