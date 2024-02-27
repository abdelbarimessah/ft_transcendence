import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { UserService } from './user.service';
import * as cookie from 'cookie';
import { AppService } from 'src/app.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8000',
    credentials: true
  },
})
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  nb: number = 0;
  private logger: Logger = new Logger('UserGateway');
  constructor(
    private userService: UserService,
    private appService: AppService,
    private configService: ConfigService,
    private jwtService: JwtService,
    ) { }



  @WebSocketServer()
  server: Server;


  handleConnection(socket: Socket) {
    this.logger.log(`[UserGateway] Client connected: ${socket.id}`);
    console.log('the data in the socket in the connection :::', socket.data);
    try {
      const cookies = socket.handshake.headers.cookie;
      this.logger.log(cookies, 'coockie');
      if (!cookies) throw new Error('No cookies found');

      const parsedCookies = cookie.parse(cookies);
      const authToken = parsedCookies['authorization'];
      if (!authToken)
        throw new Error('Authorization token not found in cookies');

      const secret = this.configService.get('JWT_SECRET');
      if (!secret) throw new Error('JWT secret is not configured');

      const decoded = this.jwtService.verify(authToken, { secret });
      console.log('the decoded', decoded);
      

      const userId = decoded.providerId;
      this.logger.log('[userGateway] the user id from the app service', userId)
      socket.data.providerId = userId;
      socket.join(`User-${userId}`)
      this.server.emit('User-status', { status: 'online', providerId: userId })

      // this.appService.set(userId, socket.id);
    } catch (error) {

      console.error('Error handling socket connection:', error.message);
      socket.disconnect(true);
    }

  }
  
  // @SubscribeMessage('User-firstTime')
  // async handlUserFirstTime(socket: Socket, data: any) {
  //   socket.data.providerId = data.providerId;
  //   socket.join(`User-${socket.data.providerId}`)
  //   this.server.emit('User-status', { status: 'online', providerId: socket.data.providerId })
  // }

  async handleDisconnect(socket: Socket) {
    const providerId = socket.data.providerId;
    const sockets = await this.server.in(`User-${providerId}`).fetchSockets();
    if (sockets.length === 0)
      this.server.emit('User-status', { status: 'offline', providerId })
  }

  @SubscribeMessage('User-status')
  async handleUserStatus(socket: Socket, data: any)
  {
    console.log(data.providerId, 'this user is in game =>>>', data.status);
    this.server.emit('User-status', { status: 'online', providerId: data.providerId })
  }
}


// @SubscribeMessage('user.status')
//   async onUserStatus(
//     @ConnectedSocket() client: Socket,
//     @MessageBody(ParseIntPipe) id: number,
//   ) {
//     const sockets = await this.server.in(`user-${id}`).fetchSockets();
//     const isOnline = sockets.length > 0;
//     const isInGame = sockets.some((socket) =>
//       Array.from(socket.rooms).some((room) => room.startsWith('game-')),
//     );
//     const status = isInGame
//       ? UserStatus.INGAME
//       : isOnline
//       ? UserStatus.ONLINE
//       : UserStatus.OFFLINE;

//     client.emit('user.status', { id, status });//to add
//   }