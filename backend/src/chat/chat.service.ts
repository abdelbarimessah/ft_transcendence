import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prismaService: PrismaService) {}

  generateChatPairHash(userId1: string, userId2: string): string {
    const ids = [userId1, userId2].sort();
    const hash = `${ids[0]}-${ids[1]}`;
    return hash;
  }
  async getUserId(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundException("user doesn't exists");
    }
    return user.id;
  }
  async createChat(userId1: string, userId2: string, chatPairHash: string) {
    return await this.prismaService.chat.create({
      data: {
        members: {
          connect: [{ id: userId1 }, { id: userId2 }],
        },
        chatPairHash,
      },
    });
  }
  async getUserChats(userId: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        chats: {
          select: {
            id: true,
            members: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }
  async getChatMessages(chatId: string, userId: string) {
    return await this.prismaService.chat.findUnique({
      where: {
        id: chatId,
        members: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        members: true,
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }
  async checkChat(chatId: string, channelId: string) {
    let target;
    if (chatId) {
      target = await this.prismaService.chat.findUnique({
        where: { id: chatId },
        select: {
          id: true,
        },
      });
    } else if (channelId) {
      target = await this.prismaService.channel.findUnique({
        where: { id: channelId },
        select: {
          id: true,
        },
      });
    }
    if (!target) {
      throw new NotFoundException('there no such chat or channel');
    }
    return target.id;
  }
  async isBlocked(chatId: string, userId: string) {
    const chatMembers = await this.prismaService.chat.findUnique({
      where: { id: chatId },
      select: {
        members: {
          select: {
            id: true,
          },
        },
      },
    });

    if (chatMembers && chatMembers.members) {
      for (const member of chatMembers.members) {
        const blocked = await this.prismaService.user.findUnique({
          where: { id: member.id },
          select: {
            blockedUsers: {
              where: {
                id: userId,
              },
            },
            blockedBy: {
              where: {
                id: userId,
              },
            },
          },
        });

        if (
          blocked &&
          (blocked.blockedUsers.length > 0 || blocked.blockedBy.length > 0)
        ) {
          throw new ForbiddenException('You are blocked by the user.');
        }
      }
    }
  }
  async isBanned(channelId: string, userId: string) {
    const membership = await this.prismaService.channelMembership.findUnique({
      where: {
        channelId_userId: {
          channelId: channelId,
          userId: userId,
        },
      },
      select: {
        isBanned: true,
      },
    });

    if (membership && membership.isBanned) {
      throw new ForbiddenException('You are banned from the channel.');
    }
  }
  async isMuted(channelId: string, userId: string) {
    const membership = await this.prismaService.channelMembership.findUnique({
      where: {
        channelId_userId: {
          channelId: channelId,
          userId: userId,
        },
      },
      select: {
        isMuted: true,
        expiresAt: true,
      },
    });

    if (membership && membership.isMuted) {
      if (membership.expiresAt && membership.expiresAt < new Date()) {
        await this.prismaService.channelMembership.update({
          where: {
            channelId_userId: {
              channelId: channelId,
              userId: userId,
            },
          },
          data: {
            isMuted: false,
            expiresAt: null,
          },
        });
      } else {
        // Mute is still in effect
        throw new ForbiddenException('You are muted in this channel.');
      }
    }
  }
}
