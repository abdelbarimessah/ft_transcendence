import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
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
      callbackURL: configService.get('Google_Client_callback'),
      scope: ['profile', 'email'],
    });

    this.defaultCoverImage = `${this.configService.get(
      'NEXT_PUBLIC_API_URL',
    )}/uploads/DefaultCover.svg`;
  }

  async validate(accesssToken: string, refreshToken: string, profile: Profile) {
    const user = await this.userService.findOrCreate({
      providerId: profile._json.sub,
      email: profile._json.email,
      nickName: profile._json.name,
      firstName: profile._json.given_name,
      lastName: profile._json.family_name,
      provider: 'google',
      avatar: profile._json.picture,
      cover: this.defaultCoverImage,
    });
    console.log('user in the validate gg', user);
    return { user };
  }
}
