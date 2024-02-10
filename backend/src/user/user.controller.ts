import {  Controller, Get, Param, Post, UseGuards, ConflictException, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
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
    findAll() {
        console.log('All users');
        
        console.log('All users');
        
        return this.userService.getAllUsers();
    }
    
    @Get('me')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user: any ) {
        try {
            if (user) {
                this.userService.uploadImage(user.avatar, user.providerId);
            } else {
                // console.log(`No user found`);
            }
        }
        catch (error) {
            // console.error('error', error);
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
        // const uploadDirdb = path.join(backendUrl, '/uploads/');
        // const uploadPathbd = path.join(uploadDirdb, `cover-${user.providerId}${'.png'}`);
        const url = new URL(`/uploads/cover-${user.providerId}${'.png'}` , backendUrl);
        await this.userService.updateCover(user.providerId, url.href);
        console.log('url', url.href);
        return { url : url.href};
    }


    
    @Post('updateInfo')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async updateInfo(@Req() req : Request, @CurrentUser() user :any){
        console.log('updateInfo body', req.body, user.providerId);
        console.log('res');
        const res = await this.userService.updateUserData(user.providerId, req.body);
        return {message : 'User data updated', data: res};
    }
    
    @Get(':id')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }
}

 
