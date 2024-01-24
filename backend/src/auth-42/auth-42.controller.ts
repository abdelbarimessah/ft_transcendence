import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { IntraAuthGuard } from './utils/Guards';

@Controller('auth-42')
export class AuthIntraController {


    @Get('profile')
    
    @UseGuards(IntraAuthGuard)
    handleIntraLogin(@Req() req: Request) {
        return {profile: req.user};
    }
    // @ts-ignore

    @Get('profile/redirect')
    handleIntraRedirect() {
        return {msg: 'Intra redirect'}
    }

}
