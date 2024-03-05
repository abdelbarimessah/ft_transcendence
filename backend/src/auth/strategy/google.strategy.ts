import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
// import { Prisma } from '@prisma/client';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private defaultCoverImage: string;
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('Google_Client_ID'),
      clientSecret: configService.get('Google_Client_Secret'),
      callbackURL: configService.get('Google_Client_callback'),
      scope: ['profile', 'email'],
    });

    this.defaultCoverImage = `${this.configService.get(
      'NEXT_PUBLIC_API_URL',
    )}/uploads/DefaultCover.svg`;
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const userData: any = {
      providerId: profile._json.sub,
      email: profile._json.email,
      nickName: profile._json.name,
      firstName: profile._json.given_name,
      lastName: profile._json.family_name,
      provider: 'google',
      avatar: profile._json.picture,
      cover: this.defaultCoverImage,
    };
    const { user, isNew } = await this.authService.userUpsert(userData);
    done(null, { user, isNew });
  }
}
