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
      include: {
        user: {
          select: {
            id: true,
            providerId: true,
            nickName: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
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
  async friendRequestNotification(
    userId: string,
    receiverId: string,
    room: string,
  ) {
    const notification = await this.prismaService.notification.create({
      data: {
        type: 'FRIEND_REQUEST',
        userId: userId,
        receiverId: receiverId,
      },
      include: {
        user: {
          select: {
            id: true,
            providerId: true,
            nickName: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
    this.notificationGateway.sendNotification(room, notification);
    //To-do send notification using the gateway

    return notification;
  }
}
