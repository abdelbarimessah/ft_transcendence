import {  Controller, Get, Param, Post, UseGuards, ConflictException, Req, UploadedFile, UseInterceptors, Body, Patch, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { OTPGuard } from 'src/auth/guards/Otp.guard';


@Controller('user')
export class UsersController {

    constructor(
        private userService: UserService,
        private prismaService: PrismaService,
    )
    {}

    @Get('All') 
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async findAll() {
        return await this.userService.getAllUsers();
    }
    
    @Get('me')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user: any ) {
        try {
            if (user) {
                this.userService.uploadImage(user.avatar, user.providerId);
            } else {
                console.log(`No user found`);
            }
        }
        catch (error) {
            console.error('error', error);
        }
        return user;
    }
    
    
    @Post('updateAvatar')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('avatar'))
    async updateProfile(@UploadedFile() file, @Req() req: Request, @CurrentUser() user: any) {
        const uploadDir = path.join(__dirname, '../../uploads/');
        const uploadPath = path.join(uploadDir, `${user.providerId}${'.png'}`);
        fs.writeFileSync(uploadPath, file.buffer);        
        await this.userService.updateAvatar(user.providerId, uploadPath);
    }

    @Post('updateCover')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('cover'))
    async updateCover(@UploadedFile() file, @Req() req: Request, @CurrentUser() user: any) {
        const uploadDir = path.join(__dirname, '../../uploads/');
        const uploadPath = path.join(uploadDir, `cover-${user.providerId}${'.png'}`);
        fs.writeFileSync(uploadPath, file.buffer);

        const backendUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = new URL(`/uploads/cover-${user.providerId}${'.png'}` , backendUrl);
        await this.userService.updateCover(user.providerId, url.href);
        console.log('url', url.href);
        return { url : url.href};
    }
    
    @Post('updateInfo')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async updateInfo(@Req() req : Request, @CurrentUser() user :any){
        const res = await this.userService.updateUserData(user.providerId, req.body);
        return {message : 'User data updated', data: res};
    }
    
    @Get('leaders')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async leaders(@Req() req : Request, )
    {
        const res = await this.userService.getLeaders();
        return {leader: res};
    }
    @Get('achievements')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async achievements(@Req() req : Request, @CurrentUser() user :any)
    {
        const res = await this.userService.getAchievements(user.providerId);
        return {achievements: res};
    }
    @Get('UsersAchievements/:id')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async UsersAchievements(@Req() req : Request, @Param('id') id: string)
    {
        const res = await this.userService.getAchievements(id);
        console.log('UsersAchievements' , res);
        
        return {achievements: res};
    }

    
    @Get('userSearch')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async userSearch(@Req() req : Request, @CurrentUser() user :any)
    {
        console.log('body', req.query);
        const searchQuery = String(req.query.query);
        const res = await this.userService.getUserSearch(searchQuery, user.providerId);
        
        return res;
    }
    
    @Patch('addFriend')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async addFriend(
        @CurrentUser() user: any,
        @Res({ passthrough: true }) res: Response,
        @Body() body:  {id: string} 
    ) {
        const friendId = body.id;
        const result = await this.userService.addFriend(user.providerId, friendId);    
        return {message: result};
    }

    @Patch('removeFriend')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async removeFriend(
        @CurrentUser() user: any,
        @Res({ passthrough: true }) res: Response,
        @Body() body:  {id: string} 
    ) {
        const friendId = body.id;
        const result = await this.userService.removeFriend(user.providerId, friendId);
        return {message: result};
    }
    @Get('friends')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async getFriends(@CurrentUser() user: any) {
        const result = await this.userService.getFriends(user.providerId);
        console.log('friends', result);
        return result;
    }

    
    @Get(':id')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: string, @CurrentUser() user: any) {

        const { friendOf, ...rest } = await this.userService.getUserById(id);
            if(id === user.providerId) return (1);

        return {
            ...rest,
            isFriend: friendOf.some((friend) => friend.providerId === user.providerId)
        };
    }
}

 
