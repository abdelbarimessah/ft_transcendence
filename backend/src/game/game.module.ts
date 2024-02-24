import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [GameController],
    providers: [GameService, PrismaService, JwtService],
    exports: [GameService],
  })
export class GameModule {}

