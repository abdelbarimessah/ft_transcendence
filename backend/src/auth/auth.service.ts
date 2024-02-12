import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
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

  async changeFirstTime(id: string) {
    const user = await this.prismaService.user.update({
      where: { providerId: id },
      data: { firstTime: true },
    });
    return user;
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

  async setOTPSecret(userId: number, secretOpt: string) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { secretOpt },
    });
    return user;
  }

  async enabelOtp(id: string) {
    const user = await this.prismaService.user.update({
      where: { providerId: id },
      data: { otpIsEnabled: true },
    });
    return user;
  }
  async disableOtp(id: string) {
    const user = await this.prismaService.user.update({
      where: { providerId: id },
      data: { otpIsEnabled: false },
    });
    return user;
  }


 async  verifyOTP(user: User, token: string) {
    if (!user.secretOpt) return false;
    console.log('user.secretOpt', user.secretOpt);
    const rew = authenticator.verify({ secret: user.secretOpt, token });
    console.log('rew', rew);
    return rew;
  }

  async genrateJwtToken(user: User) {
    const payload = { providerId: user.providerId, firstName: user.firstName };
    return this.jwtService.signAsync(payload)
    // const token = await this.jwtService.sign({id: user.privderId});
    // return token;
  }

}