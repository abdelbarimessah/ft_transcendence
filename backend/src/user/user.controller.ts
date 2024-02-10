import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('All') // Get /users or /users?role=value
  findAll() {
    return this.userService.getAllUsers();
  }

  @Get(':id') // Get /users/1
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post('upload/:id')
  @UseGuards(JwtAuthGuard)
  async uploadImage(@Param('id') id: string) {
    try {
      const user = await this.userService.getUserById(id);
      if (user) {
        this.userService.uploadImage(user.avatar, id);
      } else {
        console.log(`No user found with id: ${id}`);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(JwtAuthGuard)
  @Get('Myid')
  async getMyId(@CurrentUser() user: any) {
    console.log('current user', user);
    return user;
  }
}
