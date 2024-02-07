import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";
import { UserService } from "src/user/user.service";


@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {

  constructor(
    private  readonly userService: UserService
  ) {
    super({
      clientID: 'u-s4t2ud-b85b62147e999332737387c03f579f4821ea9b85156f0510c53c2f795c6a3e95',
      clientSecret: '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',
      callbackURL: 'http://localhost:8000/api/auth/callback/intra',
    })
  }

  async validate(accesssToken: string, refreshToken: string, profile: any) {
    const user = await this.userService.findOrCreate({
      providerId: profile.id,
      email: profile._json.email,
      nickName: profile.username,
      firstName: profile._json.first_name,
      lastName: profile._json.last_name,
      provider: 'intra',
      avatar: profile._json.image.link,
  });
    console.log('user in the validate 42', user);
    return {user};
  }
}