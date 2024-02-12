import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { OTPGuard } from './auth/guards/Otp.guard';

@Controller()
export class AppController {
  @Get('profile')
  @UseGuards(OTPGuard)
  @UseGuards(JwtAuthGuard)
  getProfile() {
    console.log('getProfile in the user controller');
    return { id: '123123123' };
  }
}
