import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  private defaultCoverImage: string;
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get('intra_Client_ID'),
      clientSecret: configService.get('intra_Client_Secret'),
      callbackURL: configService.get('intra_Client_callback'),
    });
    this.defaultCoverImage = `${this.configService.get(
      'NEXT_PUBLIC_API_URL',
    )}/uploads/DefaultCover.svg`;
  }

  async validate(accesssToken: string, refreshToken: string, profile: any) {
    console.log('Full profile:', JSON.stringify(profile, null, 2));
    const user = await this.userService.findOrCreate({
      providerId: profile.id,
      email: profile._json.email,
      nickName: profile.username,
      firstName: profile._json.first_name,
      lastName: profile._json.last_name,
      provider: 'intra',
      avatar: profile._json.image.link,
      cover: this.defaultCoverImage,
    });
    console.log('user in the validate 42', user);
    return { user };
  }
}
