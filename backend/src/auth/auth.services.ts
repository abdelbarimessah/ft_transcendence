import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';

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

  async generateOTP(user: User)
  {
    if(!user )
      console.log('user not found');
    
      let { nickName, secretOpt } = user;
  
      if (!secretOpt) secretOpt = authenticator.generateSecret();
      const app_name = 'ft_trancendence'
      const otp_url = authenticator.keyuri(nickName, app_name, secretOpt);
  
      return {
        secretOpt,
        qr_code: await toDataURL(otp_url),
        otp_url,
      };
  }


  async genrateJwtToken(user: User) {
    const payload = { providerId: user.providerId, firstName: user.firstName };
    return this.jwtService.signAsync(payload)
    // const token = await this.jwtService.sign({id: user.privderId});
    // return token;
  }

}