import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { OTPGuard } from 'src/auth/Otp.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@UseGuards(OTPGuard)
@UseGuards(AuthGuard('jwt'))
@Controller('notification')
export class NotificationController {
  constructor(private prismaService: PrismaService) {}
  @Get()
  async getNotification(@CurrentUser() user: any) {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        receiverId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return notifications;
  }
}
