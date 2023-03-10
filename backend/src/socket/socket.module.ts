import { Module, Global } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Global()
@Module({
  providers: [SocketGateway],
})
export class SocketModule {}
