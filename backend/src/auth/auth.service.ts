import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async userUpsert(userData: Prisma.UserCreateInput) {
    let isNew = false;
    const { email, firstName, lastName } = userData;
    if (!userData?.nickName) {
      const nickName = await this.generateNickname(firstName, lastName);
      userData.nickName = nickName;
    }
    let user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    const achievements = [
      'ach1',
      'ach2',
      'ach3',
      'ach4',
      'ach5',
      'ach6',
      'ach7',
    ];
    if (!user) {
      isNew = true;
      user = await this.prismaService.user.create({
        data: {
          ...userData,
          achievements: {
            create: achievements.map((name) => ({ name, locked: false })),
          },
        },
      });
    }
    return { user, isNew };
  }

  async generateNickname(firstName: string, lastName: string) {
    const { nanoid } = await import('nanoid');
    let nickName: string = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
    const MAX_ATTEMPTS = 10;
    let attempt: number = 0;
    while (attempt < MAX_ATTEMPTS) {
      const user = await this.prismaService.user.findFirst({
        where: {
          nickName,
        },
      });
      if (!user) return nickName;
      nickName = nickName + nanoid(5);
      ++attempt;
    }
    throw new Error('generating nickname failed');
  }

  async generateJwtToken(user) {
    const payload = {
      providerId: user.providerId,
      firstName: user.firstName,
      id: user.id,
    };
    return await this.jwtService.signAsync(payload);
  }

  async generateOTP(user: Prisma.UserCreateInput) {
    // eslint-disable-next-line prefer-const
    let { nickName, secretOpt } = user;

    if (!secretOpt) secretOpt = authenticator.generateSecret();
    const app_name = 'ft_transcendence';
    const otp_url = authenticator.keyuri(nickName, app_name, secretOpt);

    return {
      secretOpt,
      qr_code: await toDataURL(otp_url),
      otp_url,
    };
  }

  async setOTPSecret(userId: string, secretOpt: string) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { secretOpt },
    });
    return user;
  }

  async enableOtp(id: string) {
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

  async verifyOTP(user: Prisma.UserCreateInput, token: string) {
    if (!user.secretOpt) return false;
    const rew = authenticator.verify({ secret: user.secretOpt, token });
    return rew;
  }
}
