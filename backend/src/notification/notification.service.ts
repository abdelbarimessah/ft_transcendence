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
  // To-do add notification for channel messages
  async messageNotification(userId: string, receiverId: string, messageId) {
    const notification = await this.prismaService.notification.create({
      data: {
        type: 'MESSAGE',
        userId: userId,
        receiverId: receiverId,
        messageId: messageId,
      },
    });
    this.notificationGateway.sendNotification(receiverId, notification);
    //To-do send notification using the gateway
  }
  async gameNotification(userId: string, receiverId: string, gameId: string) {
    const notification = await this.prismaService.notification.create({
      data: {
        type: 'GAME_INVITE',
        userId: userId,
        receiverId: receiverId,
        messageId: gameId,
      },
    });
    this.notificationGateway.sendNotification(receiverId, notification);
    //To-do send notification using the gateway
  }
  async friendRequestNotification(userId: string, receiverId: string) {
    const notification = await this.prismaService.notification.create({
      data: {
        type: 'FRIEND_REQUEST',
        userId: userId,
        receiverId: receiverId,
      },
    });
    this.notificationGateway.sendNotification(receiverId, notification);
  }
}
