import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { NotificationModule } from './notification/notification.module';
// import { Auth2Module } from './auth2/auth2.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ChatModule,
    PrismaModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [GameGateway],
})
export class AppModule {}
