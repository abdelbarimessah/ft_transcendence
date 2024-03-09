import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('profile')
  // @UseGuards(OTPGuard)
  //  @UseGuards(AuthGuard('jwt'))
  getProfile() {
    return { id: '123123123' };
  }
}
