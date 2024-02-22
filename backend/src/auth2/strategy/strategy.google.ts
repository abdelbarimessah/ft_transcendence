import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { nanoid } from 'nanoid';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private defaultCoverImage: string;
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get('Google_Client_ID'),
      clientSecret: configService.get('Google_Client_Secret'),
      // callbackURL: configService.get('Google_Client_callback'), // change the .env later
      callbackURL: 'http://localhost:3000/auth/google/callback',
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
    const { name, emails, photos, id } = profile;
    const user: any = {
      providerId: id,
      email: emails[0].value,
      nickName: `name.givenName${nanoid(5)}`,
      firstName: name.givenName,
      lastName: name.familyName,
      provider: 'google',
      avatar: photos[0].value,
      picture: photos[0].value,
      cover: this.defaultCoverImage,
    };
    // upsert user in db
    done(null, user);
  }
}
