import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { OTPGuard } from 'src/auth/guards/Otp.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@UseGuards(OTPGuard)
@UseGuards(JwtAuthGuard)
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
