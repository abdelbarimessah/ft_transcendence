import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [UsersController],
    providers: [UserService, PrismaService],
    exports: [UserService],
  })
export class UsersModule {}

