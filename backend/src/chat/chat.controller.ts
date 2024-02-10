import { Controller, Get } from '@nestjs/common';

@Controller('chat')
export class ChatController {
  @Get()
  getChat() {
    return { chat: 'this is chat list' };
  }
}
