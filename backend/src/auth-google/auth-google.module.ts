import { Module } from '@nestjs/common';
import { AuthGoogleController } from './auth-google.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [PassportModule],
    controllers: [AuthGoogleController],
    providers: [GoogleStrategy],
})
export class AuthGoogleModule {}
