import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";


@Injectable()
export class  FortyTwoStrategy extends PassportStrategy(Strategy, '42')  {

  constructor() {
    super({
      clientID: 'u-s4t2ud-2bf72a39d4e038f950cb8db3893a660b1ff742a9349edb587fc9bba672be4e69',
      clientSecret: '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',
      callbackURL: 'http://localhost:8000/chat',
  })}


    async validate( accesssToken: string, refreshToken: string, profile : any) {
        // const user = {name: "test"}
        // console.log(profile);
        // console.log(accesssToken);
        // console.log(refreshToken);

        // here i should check if the user is already in the database or is the first time
        return profile;
    }


  
}