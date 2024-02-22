import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class Auth2Service {
  constructor(private prismaService: PrismaService) {}
  async userUpsert(userDto: any) {
    const { email, providerId, provider } = userDto;
    let user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      user = await this.prismaService.user.create({
        data: {
          email: email,
          providerId: providerId,
          provider: provider,
        },
      });
    }

    return user;
  }
}
