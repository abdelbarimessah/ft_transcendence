import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    private prismaService: PrismaService,
    private notificationGateway: NotificationGateway,
  ) {}
  // game notification
  // friend req notification
  // message notification
  async messageNotification(userId: string, receiverId: string, messageId) {
    return await this.prismaService.notification.create({
      data: {
        type: 'MESSAGE',
        userId: userId,
        receiverId: receiverId,
        messageId: messageId,
      },
    });
    //To-do send notification using the gateway
  }
  async gameNotification(userId: string, receiverId: string, gameId: string) {
    return await this.prismaService.notification.create({
      data: {
        type: 'GAME_INVITE',
        userId: userId,
        receiverId: receiverId,
        messageId: gameId,
      },
    });
    //To-do send notification using the gateway
  }
  async friendRequestNotification(userId: string, receiverId: string) {
    return await this.prismaService.notification.create({
      data: {
        type: 'FRIEND_REQUEST',
        userId: userId,
        receiverId: receiverId,
      },
    });
    //To-do send notification using the gateway
  }
}
