import {
  // MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  // SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Channel, ChannelMembership, Chat, Message } from '@prisma/client';
import * as cookie from 'cookie';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:8000', process.env.FRONTEND_URL],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
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

      this.appService.set(userId, client.id);
    } catch (error) {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: any) {
    const userId = this.appService.getUserIdFromSocketId(client.id);
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
  leaveRoom(userId: string, room: string) {
    const socketId = this.getSocketByUserId(userId);
    if (socketId) {
      const client = this.server.sockets.sockets.get(socketId);
      client.leave(room);
    }
  }
  //change chat type for the Prisma.chat....
  newChat(userId: string, chat: Chat) {
    const sockId = this.getSocketByUserId(userId);
    if (sockId) {
      const client = this.server.sockets.sockets.get(sockId);
      if (client) {
        client.join(chat.id);
      }
    }
    this.server.to(chat.id).emit('newChat', chat );
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

  userJoined(channelId: string, user: ChannelMembership) {
    this.server.to(channelId).emit('userJoined', { channelId, user });
  }

  userLeft(channelId: string, userId: string) {
    this.server.to(channelId).emit('userLeft', { channelId, userId });
  }
  addAdmin(channelId: string, user: ChannelMembership) {
    this.server.to(channelId).emit('addAdmin', { channelId, user });
  }
  removeAdmin(channelId: string, user: ChannelMembership) {
    this.server.to(channelId).emit('removeAdmin', { channelId, user });
  }
  muteUser(channelId: string, user: ChannelMembership) {
    this.server.to(channelId).emit('muteUser', { channelId, user });
  }
  unmuteUser(channelId: string, user: ChannelMembership) {
    this.server.to(channelId).emit('unmuteUser', { channelId, user });
  }
  banUser(channelId: string, userId: string) {
    this.server.to(channelId).emit('banUser', { channelId, userId });
  }
  kickUser(channelId: string, userId: string) {
    this.server.to(channelId).emit('kickUser', { channelId, userId });
  }
  blockUser(targetId: string, userId: string) {
    const socketId = this.getSocketByUserId(targetId);
    if (socketId) {
      this.server.to(socketId).emit('blockUser', { userId });
    }
  }
  unblockUser(targetId: string, userId: string) {
    const socketId = this.getSocketByUserId(targetId);
    if (socketId) {
      this.server.to(socketId).emit('unblockUser', { userId });
    }
  }
  //? i could optimize the code here but f it
}
