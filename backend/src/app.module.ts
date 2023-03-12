import { Module } from '@nestjs/common';
import { GlobalExceptionFilter } from './filters/globalException.filter';
import { UsersModule } from './modules/users/users.module';

import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [SocketGateway, GlobalExceptionFilter],
})
export class AppModule {}
