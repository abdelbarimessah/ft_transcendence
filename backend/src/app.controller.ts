import { Controller, Get } from '@nestjs/common';
// normally here we should serve the .html files but next is doing it
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
