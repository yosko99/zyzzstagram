import { Module } from '@nestjs/common';

import { GlobalExceptionFilter } from './filters/globalException.filter';

import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';

import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [UserModule, PostModule],
  controllers: [],
  providers: [SocketGateway, GlobalExceptionFilter],
})
export class AppModule {}
