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
import { Chat, Message } from '@prisma/client';
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
}
