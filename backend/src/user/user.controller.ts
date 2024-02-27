import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  // ConflictException,
  UploadedFile,
  UseInterceptors,
  Body,
  Patch,
  Res,
  Query,
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
  async getProfile(@CurrentUser() user: any) {
    try {
      if (user) {
        this.userService.uploadImage(user.avatar, user.providerId);
      } else {
        console.log(`No user found`);
      }
    } catch (error) {
      console.error('error', error);
    }

    return user;
  }

  @Post('updateAvatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(@UploadedFile() file, @CurrentUser() user: any) {
    const uploadDir = path.join(__dirname, '../../uploads/');
    const uploadPath = path.join(uploadDir, `${user.providerId}${'.png'}`);
    fs.writeFileSync(uploadPath, file.buffer);
    await this.userService.updateAvatar(user.providerId, uploadPath);
  }

  @Post('updateCover')
  @UseInterceptors(FileInterceptor('cover'))
  async updateCover(@UploadedFile() file, @CurrentUser() user: any) {
    const uploadDir = path.join(__dirname, '../../uploads/');
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
    await this.userService.updateCover(user.providerId, url.href);
    console.log('url', url.href);
    return { url: url.href };
  }

  @Post('updateInfo')
  async updateInfo(@Body() body: updateUserDto, @CurrentUser() user: any) {
    const res = await this.userService.updateUserData(user.providerId, body);
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
    console.log('UsersAchievements', res);

    return { achievements: res };
  }

  @Get('userSearch')
  async userSearch(@Query() query, @CurrentUser() user: any) {
    const searchQuery = String(query);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await this.userService.getUserSearch(
      searchQuery,
      user.providerId,
    );
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
    const result = await this.userService.getFriends(user?.providerId);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    const { friendOf, ...rest } = await this.userService.getUserById(id);
    if (id === user.providerId) return 1;

    return {
      ...rest,
      isFriend: friendOf.some(
        (friend) => friend.providerId === user.providerId,
      ),
    };
  }
}
