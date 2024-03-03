import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Body,
  Patch,
  Res,
  Query,
  // BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
// import { PrismaService } from 'src/prisma/prisma.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { AuthGuard } from '@nestjs/passport';
import { OTPGuard } from 'src/auth/Otp.guard';
import { providerIdDto, updateUserDto } from './user.dto';
import { Response } from 'express';
import { User } from '@prisma/client';

@UseGuards(OTPGuard)
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('All')
  async findAll() {
    return await this.userService.getAllUsers();
  }

  @Get('me')
  async getProfile(@CurrentUser() user: User) {
    try {
      if (user) {
        this.userService.uploadImage(user.avatar, user.providerId);
      } else {
        console.log(`No user found`);
        // throw new BadRequestException();
      }
    } catch (error) {
      console.error('error', error);
    }
    delete user.secretOpt;
    return user;
  }

  @Post('updateAvatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(@UploadedFile() file, @CurrentUser() user: any) {
    const uploadDir = path.join(__dirname, '../../../uploads/');
    const uploadPath = path.join(uploadDir, `${user.providerId}${'.png'}`);
    fs.writeFileSync(uploadPath, file.buffer);

    const backendUrl = 'http://localhost:3000';
    const url = new URL(`/uploads/${user.providerId}${'.png'}`, backendUrl);

    url.searchParams.append('time', Date.now().toString());

    await this.userService.updateAvatar(user.providerId, url.href);
  }

  @Post('updateCover')
  @UseInterceptors(FileInterceptor('cover'))
  async updateCover(@UploadedFile() file, @CurrentUser() user: any) {
    const uploadDir = path.join(__dirname, '../../../uploads/');
    const uploadPath = path.join(
      uploadDir,
      `cover-${user.providerId}${'.png'}`,
    );
    fs.writeFileSync(uploadPath, file.buffer);

    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = new URL(
      `/uploads/cover-${user.providerId}${'.png'}`,
      backendUrl,
    );
    url.searchParams.append('time', Date.now().toString());

    await this.userService.updateCover(user.providerId, url.href);
    return { url: url.href };
  }

  @Post('updateInfo')
  async updateInfo(@Body() body: updateUserDto, @CurrentUser() user: any) {
    const res = await this.userService.updateUserData(user.providerId, body);
    delete res.secretOpt;
    return { message: 'User data updated', data: res };
    // return res.redirect('http://localhost:8000/profile');
  }

  @Get('leaders')
  async leaders() {
    const res = await this.userService.getLeaders();
    return { leader: res };
  }
  @Get('achievements')
  async achievements(@CurrentUser() user: any) {
    const res = await this.userService.getAchievements(user.providerId);
    return { achievements: res };
  }

  @Get('UsersAchievements/:id')
  async UsersAchievements(@Param('id') id: string) {
    const res = await this.userService.getAchievements(id);
    return { achievements: res };
  }

  @Get('userSearch')
  async userSearch(@Query('query') query, @CurrentUser() user: any) {
    const searchQuery = String(query);
    return await this.userService.getUserSearch(searchQuery, user.providerId);
  }

  @Patch('addFriend')
  async addFriend(
    @CurrentUser() user: any,
    @Res({ passthrough: true }) res: Response,
    @Body() body: providerIdDto,
  ) {
    const friendId = body.id;
    const result = await this.userService.addFriend(user?.providerId, friendId);
    return { message: result };
  }

  @Patch('removeFriend')
  async removeFriend(
    @CurrentUser() user: any,
    @Res({ passthrough: true }) res: Response,
    @Body() body: providerIdDto,
  ) {
    const friendId = body.id;
    const result = await this.userService.removeFriend(
      user.providerId,
      friendId,
    );
    return { message: result };
  }
  @Get('friends')
  async getFriends(@CurrentUser() user: any) {
    const res = await this.userService.getFriends(user?.providerId);
    return res;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    const { friendOf, ...rest } = await this.userService.getUserById(id);
    
    if (id === user.providerId) 
    {
      console.log('error in the matching of the user');
      
      return 1;
    }

    return {
      ...rest,
      isFriend: friendOf.some(
        (friend) => friend.providerId === user.providerId,
      ),
    };
  }
}
