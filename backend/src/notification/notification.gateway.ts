import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway()
export class NotificationGateway {
  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }
  // To-do
  @WebSocketServer()
  server: Server;
  constructor(private prismaService: PrismaService) {}
  @SubscribeMessage('notification')
  async readNotification(client: any, payload: any) {
    // find client id not socket id
    // To-do complete the method and make sure it works;
    const userId = client.id;
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
  // To-do send notification
  async sendNotification(receiver: string, notification: any) {
    this.server.to(receiver).emit('notification', notification);
  }
}
