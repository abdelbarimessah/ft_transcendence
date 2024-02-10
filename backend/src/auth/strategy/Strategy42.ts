import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly userService: UserService) {
    super({
      clientID:
        'u-s4t2ud-ef457919ad05f90a8cdf6b3681d80a6f10058a83a4786b74eb5ffb3ae8141408',
      clientSecret:
        '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',
      callbackURL: 'http://localhost:8000/api/auth/callback/intra',
    });
  }

  async validate(accesssToken: string, refreshToken: string, profile: any) {
    const user = {
      providerId: profile.id,
      email: profile._json.email,
      nickName: profile.username,
      firstName: profile._json.first_name,
      lastName: profile._json.last_name,
      provider: 'intra',
      avatar: profile._json.image.link,
    };
    this.userService.findOrCreate(user);
    return { user };
  }
}
