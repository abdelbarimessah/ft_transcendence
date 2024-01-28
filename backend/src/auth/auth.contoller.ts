import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { IntraAuthGuard } from '../auth/guards/Guards42';
import { GoogleAuthGuard } from './guards/GuardsGoogle';
import { AuthService } from './auth.services';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';

@Controller('auth')
export class AuthContoller {

    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
    ) { }

    @Get('42')
    @UseGuards(IntraAuthGuard)
    async handleIntraLogin(@Req() req: Request) {
        const token = await this.authService.genrateJwtToken(req.user.user);
        console.log(req.user.user.privderId);
        console.log('token ===>', token);
        console.log('req.user ===> ', req.user);
        return { token: token, profile: req.user.user };
    }


    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async handleGoogleLogin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.genrateJwtToken(req.user.user);
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        })
        console.log('token ===>', token);
        return { token: token, profile: req.user.user };
    }

    // @Get('google')
    // @UseGuards(GoogleAuthGuard)
    // async handleGoogleLogin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    //     const token = await this.authService.genrateJwtToken(req.user.user);
    //     res.cookie('access_token', token, {
    //         httpOnly: true,
    //         secure: false,
    //         sameSite: 'lax',
    //         expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    //     }).send({ status: 'ok'});
    //     console.log(req.user.user.privderId);
    //     console.log('token ===>', token);
    //     console.log('req.user ===> ', req.user);
    //     // return {token : token, profile: req.user.user};
    // }

    // @Get('google')
    // @UseGuards(GoogleAuthGuard)
    // async handleGoogleLogin(@Req() req: Request,@Res() res: Response) {
    //     const token = await this.authService.genrateJwtToken(req.user.user);
    //     console.log(req.user.user.privderId);
    //     console.log('token ===>', token);
    //     console.log('req.user ===> ', req.user);
    //     res.cookie('authorization', token, {httpOnly: true});
    //     return {token : token, profile: req.user.user};
    // }
}