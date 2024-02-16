import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [GameController],
    providers: [GameService, PrismaService],
    exports: [GameService],
  })
export class UsersModule {}

