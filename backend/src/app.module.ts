import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AuthGoogleController } from './auth-google/auth-google.controller';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { AuthIntraModule } from './auth-42/auth-42.module';
import { AuthIntraController } from './auth-42/auth-42.controller';

@Module({
  imports: [UsersModule, AuthModule, AuthGoogleModule, AuthIntraModule],
  controllers: [AppController, AuthGoogleController, AuthIntraController],
  providers: [GameGateway],
})
export class AppModule {}
