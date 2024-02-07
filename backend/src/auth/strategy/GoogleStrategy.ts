import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { UserService } from "src/user/user.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private  readonly userService: UserService,
    ) {
        super({
            clientID: "9508083938-l2076muprn1n63g55bgpt3jh7uphkd4i.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: 'http://localhost:8000/api/auth/callback/google',
            scope: ['profile', 'email'],
        });

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
        });
        console.log('user in the validate gg', user);
        return {user};
    }

}


