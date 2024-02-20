import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { Channel, Chat, Message, User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { OTPGuard } from 'src/auth/guards/Otp.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(OTPGuard)
@UseGuards(JwtAuthGuard)
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private userSocket = new Map<string, string>();
  @WebSocketServer()
  server: Server;
  constructor(private chatService: ChatService) {}

  handleConnection(client: any) {
    //To-do: find some way to extract the userId given that this method executes before Guards
    console.log('welcome:', client.id);
    const userId = 'someKey';
    this.userSocket.set(userId, client.id);
  }

  handleDisconnect(client: any) {
    const userId = Array.from(this.userSocket.entries()).find(
      ([, value]) => value === client.id,
    )?.[0];
    if (userId) this.userSocket.delete(userId);
  }

  getSocketByUserId(userId: string) {
    return this.userSocket.get(userId);
  }

  // @SubscribeMessage('message')
  // handleMessage(@MessageBody() data: string) {
  //   console.log("i'm here", data);
  //   this.server.emit('message', data);
  //   this.chatService.getChat();
  // }

  joinRoom(userId: string, chatId: string) {
    const socketId = this.userSocket.get(userId);
    if (socketId) {
      const client = this.server.sockets.sockets.get(socketId);
      client.join(chatId);
    }
  }
  //change chat type for the Prisma.chat....
  newChat(userId: string, chat: Chat) {
    const sockId = this.getSocketByUserId(userId);
    if (sockId) {
      const client = this.server.sockets.sockets.get(userId);
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
}
