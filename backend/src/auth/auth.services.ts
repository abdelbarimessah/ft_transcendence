import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
  ) {}
  
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }


  async genrateJwtToken(user: User) {
    const payload = { firstName: user.firstName, privderId: user.privderId };
    return {
      access_token: this.jwtService.sign(payload),
    };
    // const token = await this.jwtService.sign({id: user.privderId});
    // return token;
  }

}