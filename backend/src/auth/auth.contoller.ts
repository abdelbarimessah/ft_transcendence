import { Controller, ExecutionContext, Get, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, createParamDecorator } from '@nestjs/common';
import { Request, Response } from 'express';
import { IntraAuthGuard } from './guards/intra.guard';
import { GoogleAuthGuard } from './guards/Google.guard';
import { AuthService } from './auth.services';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthContoller {

    constructor(
        private jwtService: JwtService,
        private authService: AuthService,
    ) { }
    
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async handleGoogleLogin(@Req() req: Request,@Res({ passthrough: true }) res: Response ) {
        // const token = await this.jwtService.signAsync(req.user.user);
        const User = {
            providerId: req.user.user.providerId,
            nickName: req.user.user.nickName,
        }
        const token = await this.jwtService.signAsync(User);
        res.cookie('authorization', token, {
            httpOnly: true,
            secure: false,

            sameSite: 'lax',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        })
        console.log('token ===>', token);
        return {token}
    }

    @Get('42')
    @UseGuards(IntraAuthGuard)
    async handleIntraLogin(@Req() req: Request,@Res({ passthrough: true }) res: Response ) {
        // const token = await this.jwtService.signAsync(req.user.user);
        const User = {
            providerId: req.user.user.providerId,
            nickName: req.user.user.nickName,
        }
        const token = await this.jwtService.signAsync(User);
        res.cookie('authorization', token, {
            httpOnly: true,
            secure: false,
    
            sameSite: 'lax',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        })
        console.log('token ===>', token);
        return {token}
    }

    // @Patch('generate/Otp')
    // @UseGuards(JwtAuthGuard)
    // async generateOtpSecret(@CurrentUser() user:any) {
        //     const { secretOpt, qr_code } = await this.authService.generateOTP(user);
        
        //     console.log('otpSecret ===>', secretOpt);
        //     console.log('qr_code ===>', qr_code);
    //     // if (!user.otpSecret)
    //     //     await this.authService.setOTPSecret(user.id, otpSecret);
    
    //     return { qr_code };
    // }
    
    @Patch('generate/Otp')
    @UseGuards(JwtAuthGuard)
    async generateOtpSecret(@CurrentUser() user:any) {
        const { secretOpt, qr_code } = await this.authService.generateOTP(user);

        console.log('otpSecret ===>', secretOpt);
        console.log('qr_code ===>', qr_code);

        // if (!user.secretOpt)
        //     await this.authService.setOTPSecret(user.id, otpSecret);

        return { qr_code };
    }
    


    @Get('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        console.log('logout');
        res.clearCookie('authorization', { httpOnly: true });
    }
}