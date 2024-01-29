import { Controller, ExecutionContext, Get, Req, Res, UseGuards, createParamDecorator } from '@nestjs/common';
import { Request, Response } from 'express';
import { IntraAuthGuard } from '../auth/guards/Guards42';
import { GoogleAuthGuard } from './guards/GuardsGoogle';
import { AuthService } from './auth.services';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
export class AuthContoller {

    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
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

    @Get('Myid')
    @UseGuards(JwtAuthGuard)
    async getMyId(@CurrentUser() user: any) {
        console.log('current user', user);
        return user;
    }
}