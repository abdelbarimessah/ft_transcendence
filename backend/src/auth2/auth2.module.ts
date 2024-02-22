import { Module } from '@nestjs/common';
import { Auth2Service } from './auth2.service';
import { Auth2Controller } from './auth2.controller';

@Module({
  providers: [Auth2Service],
  controllers: [Auth2Controller]
})
export class Auth2Module {}
