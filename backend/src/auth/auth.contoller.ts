import { Body, Controller, ExecutionContext, Get, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, createParamDecorator } from '@nestjs/common';
import { Request, Response } from 'express';
import { IntraAuthGuard } from './guards/intra.guard';
import { GoogleAuthGuard } from './guards/Google.guard';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { use } from 'passport';
import { authenticator } from 'otplib';

@Controller('auth')
export class AuthContoller {

    constructor(
        private jwtService: JwtService,
        private authService: AuthService,
    ) { }
    
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async handleGoogleLogin(@CurrentUser() user:any,@Res({ passthrough: true }) res: Response ) {
        const User = {
            providerId: user.providerId,
            nickName: user.nickName,
            otp: false
        }
        const token = await this.jwtService.signAsync(User);
        res.cookie('authorization', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        })
        console.log('token ===>', token);
        console.log('verif user===>', user.otpIsEnabled)
        return { token, otp: { enabled: user.otpIsEnabled, verified: false } };
    }

    @Get('42')
    @UseGuards(IntraAuthGuard)
    async handleIntraLogin(@CurrentUser() user:any,@Res({ passthrough: true }) res: Response ) {
        console.log(' user is :', user);
        
        const User = {
            providerId: user.providerId,
            nickName: user.nickName,
            otp: false
        }
        const token = await this.jwtService.signAsync(User);
        res.cookie('authorization', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        })
        console.log('token ===>', token);
        console.log('verif user===>', user.otpIsEnabled)
        return { token, otp: { enabled: user.otpIsEnabled, verified: false } };
    }
    
    @Patch('generate/Otp')
    @UseGuards(JwtAuthGuard)
    async generateOtpSecret(@CurrentUser() user:any) {
        const { secretOpt, qr_code } = await this.authService.generateOTP(user);

        console.log('otpSecret ===>', secretOpt);
        console.log('qr_code ===>', qr_code);

        if (!user.secretOpt)
            await this.authService.setOTPSecret(user.id, secretOpt);

        return { qr_code };
    }


    @Patch('enable/Otp')
    @UseGuards(JwtAuthGuard)
    async enableOtp(
        @CurrentUser() user:any,
        @Res({ passthrough: true }) res: Response ,
        @Body() body: {otp: string}
        ) 
    {
        if(user.otpIsEnabled || !user.secretOpt)
            throw new Error('otp already enabled');

        const isValid = authenticator.verify({ token: body.otp, secret: user.secretOpt });
        console.log('token ===>', body.otp);
        console.log('secret ===>', user.secretOpt);
        if(!isValid)
            throw new Error('invalid otp');
        else
            console.log('otp is valid');
        await this.authService.enabelOtp(user.providerId);

        const User = {
            providerId: user.providerId,
            nickName: user.nickName,
            otp: true
        }
        const token = await this.jwtService.signAsync(User);
        res.cookie('authorization', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        })
        return { token, otp: { enabled: true, verified: true } };

    }    
    @Patch('disable/Otp')
    @UseGuards(JwtAuthGuard)
    async disableOtp(
        @CurrentUser() user:any,
        @Res({ passthrough: true }) res: Response ,
        ) 
    {
        await this.authService.disableOtp(user.providerId);

        const User = {
            providerId: user.providerId,
            nickName: user.nickName,
            otp: false
        }
        const token = await this.jwtService.signAsync(User);
        res.cookie('authorization', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        })
        return { token, otp: { enabled: false, verified: false } };
    }    


    @Get('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        console.log('logout');
        res.clearCookie('authorization', { httpOnly: true });
    }
}

