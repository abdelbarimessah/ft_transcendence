import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ChatModule } from './chat/chat.module';
import { ChatNoSpecGateway } from './chat--no-spec/chat--no-spec.gateway';

@Module({
  imports: [UsersModule, AuthModule, ChatModule],
  controllers: [AppController],
  providers: [GameGateway, ChatNoSpecGateway],
})
export class AppModule {}
