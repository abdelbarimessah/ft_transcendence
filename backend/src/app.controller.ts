import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('profile')
  // @UseGuards(OTPGuard)
  //  @UseGuards(AuthGuard('jwt'))
  getProfile() {
    console.log('getProfile in the user controller');
    return { id: '123123123' };
  }
}
