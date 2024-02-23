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
  async messageNotification(userId: string, receiverId: string, chatId) {
    return await this.prismaService.notification.create({
      data: {
        type: 'MESSAGE',
        userId,
        receiverId,
        chatId,
      },
    });
    //To-do i need to get user socket change receiverId with socketId
    //To-do send notification using the gateway
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
  }
}
