import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
// import { Prisma } from '@prisma/client';
import { Strategy } from 'passport-42';
import { AuthService } from '../auth.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  private defaultCoverImage: string;
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('intra_Client_ID'),
      clientSecret: configService.get('intra_Client_Secret'),
      // callbackURL: configService.get('intra_Client_callback'),
      callbackURL: 'http://localhost:3000/auth/42/callback',
    });
    this.defaultCoverImage = `${this.configService.get(
      'NEXT_PUBLIC_API_URL',
    )}/uploads/DefaultCover.svg`;
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done,
  ) {
    const userData: any = {
      providerId: profile.id,
      email: profile._json.email,
      nickName: profile.username,
      firstName: profile._json.first_name,
      lastName: profile._json.last_name,
      provider: 'intra',
      avatar: profile._json.image.link,
      cover: this.defaultCoverImage,
    };
    const { user, isNew } = await this.authService.userUpsert(userData);
    done(null, { user, isNew });
  }
}
