import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AuthGoogleController } from './auth-google/auth-google.controller';
import { AuthGoogleModule } from './auth-google/auth-google.module';

@Module({
  imports: [UsersModule, AuthModule, AuthGoogleModule],
  controllers: [AppController, AuthGoogleController],
  providers: [GameGateway],
})
export class AppModule {}
