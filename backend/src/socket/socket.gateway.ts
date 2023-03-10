import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger('SocketGateway');

  afterInit(server: Server) {
    this.logger.log('Gateway initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`${client.id} disconnected.`);
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`${client.id} connected.`);
  }
}
