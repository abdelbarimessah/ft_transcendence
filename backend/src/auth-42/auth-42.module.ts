import { Module } from '@nestjs/common';
import { AuthIntraController } from './auth-42.controller';
import { FortyTwoStrategy } from './utils/Strategy42';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [PassportModule],
    controllers: [AuthIntraController],
    providers: [FortyTwoStrategy],
})
export class AuthIntraModule {}
