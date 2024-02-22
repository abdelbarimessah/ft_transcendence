import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { OTPGuard } from './auth/guards/Otp.guard';

// normally here we should serve the .html files but next is doing it
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
