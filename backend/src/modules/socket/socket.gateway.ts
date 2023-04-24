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
import * as jwt from 'jsonwebtoken';

import IToken from '../../interfaces/IToken';
import getMapByValue from '../../functions/getMapByValue';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger('SocketGateway');
  private onlineUsers = new Map();

  afterInit(server: Server) {
    this.logger.log('Gateway initialized');
  }

  handleDisconnect(client: Socket) {
    this.onlineUsers.delete(client.id);
    this.logger.log(`${client.id} disconnected.`);
  }

  @SubscribeMessage('connected')
  handleConnection(client: Socket, token: string | undefined) {
    jwt.verify(token, process.env.JSONWEBTOKEN_KEY, (err, data) => {
      if (!err) {
        const tokenData = data as IToken;
        this.onlineUsers.set(client.id, tokenData.username);
      }
    });

    this.logger.log(`${client.id} connected.`);
  }

  @SubscribeMessage('notification')
  handleNotification(client: Socket, username: string) {
    const receiverSocketId = getMapByValue(this.onlineUsers, username);

    if (receiverSocketId !== undefined) {
      this.server.emit(`notification-${receiverSocketId}`);
    }
  }
}
