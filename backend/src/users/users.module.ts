import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    // controllers: [UsersController],
    exports: [UsersService],
    providers: [UsersService],
  })
export class UsersModule {}

