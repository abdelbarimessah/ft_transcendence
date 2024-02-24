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
  async messageNotification(
    userId: string,
    receiverId: string,
    chatId: string,
  ) {
    const notification = await this.prismaService.notification.create({
      data: {
        type: 'MESSAGE',
        userId,
        receiverId,
        chatId,
      },
    });
    this.notificationGateway.sendNotification(chatId, notification);
  }
  async gameNotification(userId: string, receiverId: string, gameId: string) {
    return await this.prismaService.notification.create({
      data: {
        type: 'GAME_INVITE',
        userId: userId,
        receiverId: receiverId,
        gameId,
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
