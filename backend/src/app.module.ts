import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController],
  providers: [GameGateway],
})
export class AppModule {}
