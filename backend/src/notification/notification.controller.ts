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
        status: 'PENDING',
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        user: {
          select: {
            id: true,
            providerId: true,
            avatar: true,
            nickName: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    console.log('notifications', notifications);
    // delete notifications.user?.secretOpt
    return notifications;
  }
}
