import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma/prisma.service';

// @WebSocketGateway({
//   cors: {
//     origin: 'http://localhost:8000',
//   },
// })
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:8000', 'http://localhost:8000/'],
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
  async readNotification(client: any, payload: any) {
    const userId = this.appService.getUserIdFromSocketId(client.id);
    console.log('notif read', userId);
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
    // TODO (abdelhamid)
    console.log('the notif send : ', notification);
    
    this.server.to(receiver).emit('notification', notification);
  }
}
