import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [GameGateway],
})
export class AppModule {}
