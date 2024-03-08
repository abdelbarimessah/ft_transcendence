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
    origin: ['http://localhost:8000', process.env.FRONTEND_URL],
    credentials: true,
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
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    try {
      const cookies = socket.handshake.headers.cookie;
      if (!cookies) throw new Error('No cookies found');

      const parsedCookies = cookie.parse(cookies);
      const authToken = parsedCookies['authorization'];
      if (!authToken)
        throw new Error('Authorization token not found in cookies');

      const secret = this.configService.get('JWT_SECRET');
      if (!secret) throw new Error('JWT secret is not configured');

      const decoded = this.jwtService.verify(authToken, { secret });

      this.logger.log(`[UserGateway] Client connected: ${socket.id}`);
      const userId = decoded.providerId;
      socket.data.providerId = userId;
      socket.join(`User-${userId}`);
      this.server.emit('User-status', { status: 'online', providerId: userId });
    } catch (error) {
      socket.disconnect(true);
    }
  }

  async handleDisconnect(socket: Socket) {
    const providerId = socket.data.providerId;
    const sockets = await this.server.in(`User-${providerId}`).fetchSockets();
    if (sockets.length === 0) {
      this.server.emit('User-status', { status: 'offline', providerId });
    }
  }

  @SubscribeMessage('customLogout')
  async handleCustomLogout(socket: Socket) {
    const userId = socket.data.user.providerId;
    this.server.socketsLeave(`User-${userId}`);
    const sockets = await this.server.in(`User-${userId}`).fetchSockets();

    if (sockets.length === 0) {
      this.server.emit('User-status', {
        status: 'offline',
        providerId: userId,
      });
    }
  }

  @SubscribeMessage('User-status')
  async handleUserStatus(socket: Socket, data: any) {
    this.server.emit('User-status', {
      status: data.status,
      providerId: data.providerId,
    });
  }

  @SubscribeMessage('updateInfo')
  handleUpdateInfo(socket: Socket, data: any) {
    this.server.emit('updateInfo', { providerId: data.providerId });
  }
}
