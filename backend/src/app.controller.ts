import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { use } from 'passport';

@Controller()
export class AppController {
    
    constructor(
    ){}

    @Post('auth/login')
    async login(@Request() req) {
        
        // return this.authService.login(req.user);
    }


    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        // console.log('req.user in the profile route ===>', req.user);
        console.log('request from the cookie  ===>', req.cookies);
        return req.user;
    }

    @Get('test')
    getTest(@Request() req){
        const myCookieValue = req.cookies['test']
        console.log('myCookie value:', myCookieValue);
    
        // console.log('test cookie ===>', req);
    }
    
    @Get('test')
    @UseGuards(JwtAuthGuard)
    handelTest(@Request() req) {
        console.log('intra info route ===>', req.user);
        return req.user;
    }
}
