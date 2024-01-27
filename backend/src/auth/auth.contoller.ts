import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { IntraAuthGuard } from '../auth/guards/Guards42';
import { GoogleAuthGuard } from './guards/GuardsGoogle';
import { AuthGuard } from '@nestjs/passport';
import {AuthService} from './auth.services';
import { JwtService } from '@nestjs/jwt';
import { generate } from 'rxjs';

@Controller('auth')
export class AuthContoller {
    constructor(
        private  authService: AuthService,
        private  jwtService: JwtService,
        ) {}
    @Get('42')
    @UseGuards(IntraAuthGuard)
    async handleIntraLogin(@Req() req: Request) {
        return {mag: 'hello from the return in th auth', Profile: req.user};
    }


    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async handleGoogleLogin(@Req() req: Request) {
        // const token = await  this.jwtService.signAsync({id: req.user.user.id});
        // const token = await  this.jwtService.signAsync({privderId: req.user.user.privderId});
        const token = await this.authService.genrateJwtToken(req.user.user);
        console.log(req.user.user.privderId);
        console.log('token ===>', token);
        console.log('req.user ===> ', req.user);
        return {token : token, profile: req.user.user};
    }
    
}
