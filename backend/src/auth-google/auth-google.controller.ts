import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth-google')
export class AuthGoogleController {

    @Get('profile')
    @UseGuards(GoogleAuthGuard)
    // @UseGuards(AuthGuard('google'))

    handleGoogleLogin(@Req() req: Request) {
        return {profile: req.user};
    }
    // @ts-ignore

    @Get('profile/redirect')
    handleGoogleRedirect() {
        return {msg: 'google redirect'}
    }
}
