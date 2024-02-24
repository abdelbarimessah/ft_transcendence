import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { GameModule } from './game/game.module';



@Module({
  imports: [UsersModule, AuthModule, GameModule],
  controllers: [AppController],
  providers: [GameGateway],
})
export class AppModule {}
