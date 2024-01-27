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
      clientID: 'u-s4t2ud-2bf72a39d4e038f950cb8db3893a660b1ff742a9349edb587fc9bba672be4e69',
      clientSecret: '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',
      callbackURL: 'http://localhost:8000/api/auth/callback/intra',
    })
  }

  async validate(accesssToken: string, refreshToken: string, profile: any) {

    const user = {
      privderId: profile.id,
      email: profile._json.email,
      nickName: profile.username,
      firstName: profile._json.first_name,
      lastName: profile._json.last_name,
      provider: 'intra',
      avatar: profile._json.image.link,
    };
    this.userService.findOrCreate(user)
    return {user};
  }
}