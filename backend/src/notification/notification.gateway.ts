import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:8000', process.env.FRONTEND_URL],
    credentials: true,
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    private prismaService: PrismaService,
    private appService: AppService,
  ) {}
  @SubscribeMessage('notification')
  async readNotification(client: any) {
    const userId = this.appService.getUserIdFromSocketId(client.id);
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
  @SubscribeMessage('firstTime')
  handleFirstTime(socket: Socket, data: any) {
    socket.join(data.providerId);
  }
  async sendNotification(receiver: string, notification: any) {
    this.server.to(receiver).emit('notification', notification);
  }
}
