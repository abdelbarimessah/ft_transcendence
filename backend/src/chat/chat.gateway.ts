import {
  // MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  // SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Channel, Chat, Message, User } from '@prisma/client';
import * as cookie from 'cookie';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';

// @WebSocketGateway({
//   cors: {
//     origin: 'http://localhost:8000',
//   },
// })
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:8000', 'http://localhost:8000/'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // private userSocket = new Map<string, string>();
  @WebSocketServer()
  server: Server;
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private appService: AppService,
  ) {}

  handleConnection(client: Socket) {
    try {
      const cookies = client.handshake.headers.cookie;
      if (!cookies) throw new Error('No cookies found');

      const parsedCookies = cookie.parse(cookies);
      const authToken = parsedCookies['authorization'];
      if (!authToken)
        throw new Error('Authorization token not found in cookies');

      const secret = this.configService.get('JWT_SECRET');
      if (!secret) throw new Error('JWT secret is not configured');

      const decoded = this.jwtService.verify(authToken, { secret });

      const userId = decoded.id;
      console.log(`${userId} joined`);

      this.appService.set(userId, client.id);
    } catch (error) {
      console.error('Error handling socket connection:', error.message);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: any) {
    const userId = this.appService.getUserIdFromSocketId(client.id);
    console.log(`${userId} disconnected`);
    if (userId) this.appService.delete(userId);
  }

  getSocketByUserId(userId: string) {
    return this.appService.get(userId);
  }

  // @SubscribeMessage('message')
  // handleMessage(@MessageBody() data: string) {
  //   this.server.emit('message', data);
  //   this.chatService.getChat();
  // }

  joinRoom(userId: string, chatId: string) {
    const socketId = this.getSocketByUserId(userId);
    if (socketId) {
      const client = this.server.sockets.sockets.get(socketId);
      client.join(chatId);
    }
  }
  //change chat type for the Prisma.chat....
  newChat(userId: string, chat: Chat) {
    const sockId = this.getSocketByUserId(userId);
    if (sockId) {
      const client = this.server.sockets.sockets.get(sockId);
      if (client) {
        client.join(chat.id);
        this.server.to(sockId).emit('newChat', { chat });
      }
    }
  }

  sendMessage(room: string, message: Message) {
    this.server.to(room).emit('newMessage', message);
  }

  updateChannel(room: string, channel: Channel) {
    this.server.to(room).emit('updateChannel', channel);
  }

  deleteChannel(channelId: string) {
    this.server.to(channelId).emit('deleteChannel', channelId);
  }

  userJoined(channelId: string, user: User) {
    this.server.to(channelId).emit('userJoined', { channelId, user });
  }

  userLeft(channelId: string, user: User) {
    this.server.to(channelId).emit('userLeft', { channelId, user });
  }
  addAdmin(channelId: string, userId: string) {
    this.server.to(channelId).emit('addAdmin', { channelId, userId });
  }
  removeAdmin(channelId: string, userId: string) {
    this.server.to(channelId).emit('removeAdmin', { channelId, userId });
  }
  muteUser(channelId: string, userId: string, mute: boolean) {
    this.server.to(channelId).emit('muteUser', { channelId, userId, mute });
  }
  banUser(channelId: string, userId: string, ban: boolean) {
    this.server.to(channelId).emit('banUser', { channelId, userId, ban });
  }
  kickUser(channelId: string, userId: string) {
    this.server.to(channelId).emit('kickUser', { channelId, userId });
  }
  //To-do add block and unblock and anything i forget
}
