import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '9508083938-abu8dn1cmhgc031enbhr4nafen1j6j5e.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/auth-google/profile',
            scope: ['profile', 'email'],
        });
    }

    async validate( accesssToken: string, refreshToken: string, profile : Profile) {
        // const user = {name: "test"}
        // console.log(profile);
        // console.log(accesssToken);
        // console.log(refreshToken);
        return profile;
    }
}