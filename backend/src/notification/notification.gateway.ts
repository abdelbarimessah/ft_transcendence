import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({namespace: 'notification'})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    private prismaService: PrismaService,
    private appService: AppService,
  ) {}
  @SubscribeMessage('notification')
  async readNotification(client: any, payload: any) {
    const userId = this.appService.getUserIdFromSocketId(client.id);
    console.log(payload);
    const notificationUpdate = await this.prismaService.notification.updateMany(
      {
        where: {
          receiverId: userId,
        },
        data: {
          status: 'READ',
        },
      },
    );
    // return { message: "notification updated" };
    return notificationUpdate;
  }

  async sendNotification(receiver: string, notification: any) {
    this.server.to(receiver).emit('notification', notification);
  }
}
