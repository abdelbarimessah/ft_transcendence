import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateChannelDto, createChannelDto } from './chat.dto';
import * as bcrypt from 'bcrypt';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {
  constructor(
    private prismaService: PrismaService,
    private chatGateway: ChatGateway,
  ) {}

  generateChatPairHash(userId1: string, userId2: string): string {
    const ids = [userId1, userId2].sort();
    const hash = `${ids[0]}-${ids[1]}`;
    return hash;
  }
  async checkUserId(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new BadRequestException("user doesn't exists");
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
            updatedAt: 'asc',
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
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            author: {
              select: {
                id: true,
                providerId: true,
                avatar: true,
                nickName: true,
              },
            },
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
        include: {
          members: true,
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
      throw new BadRequestException('there no such chat or channel');
    }
    return target;
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
        throw new ForbiddenException('You are muted in this channel.');
      }
    }
  }
  async createMessage(
    userId: string,
    chatId: string,
    channelId: string,
    content: string,
  ) {
    return this.prismaService.message.create({
      data: {
        content,
        authorId: userId,
        ...(chatId && { chatId }),
        ...(channelId && { channelId }),
      },
      include: {
        author: {
          select: {
            id: true,
            providerId: true,
            avatar: true,
            nickName: true,
          },
        },
      },
    });
  }
  async checkChannel(channelId: string) {
    const channel = await this.prismaService.channel.findUnique({
      where: { id: channelId },
    });
    if (!channel) {
      throw new BadRequestException(`Channel not found.`);
    }
  }
  async createChannel(data: createChannelDto, userId: string) {
    let hashedPassword = null;
    if (data.type === 'PROTECTED') {
      if (!data.password) throw new BadRequestException("there's no password");
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    const channel = await this.prismaService.channel.create({
      data: {
        name: data.name,
        type: data.type,
        password: hashedPassword,
        ownerId: userId,
        members: {
          create: [{ userId, isAdmin: true }],
        },
      },
    });

    return channel;
  }
  async getUserChannels(userId: string) {
    const memberships = await this.prismaService.channelMembership.findMany({
      where: {
        userId: userId,
        isBanned: false,
      },
      include: {
        channel: {
          select: {
            id: true,
            name: true,
            type: true,
            createdAt: true,
            ownerId: true,
          },
        },
      },
    });
    if (!memberships || memberships.length === 0) {
      throw new BadRequestException('No channels found for the user.');
    }
    const channels = memberships.map((membership) => {
      this.chatGateway.joinRoom(userId, membership.channel.id);
      return membership.channel;
    });
    return channels;
  }
  async updateChannel(
    channelId: string,
    userId: string,
    data: UpdateChannelDto,
  ) {
    const channel = await this.prismaService.channel.findUnique({
      where: { id: channelId },
    });
    if (!channel) {
      throw new BadRequestException(`Channel not found`);
    }
    if (channel.ownerId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this channel',
      );
    }
    if (data.type === 'PROTECTED' && data.password) {
      if (data.password.length === 0) {
        throw new BadRequestException(
          'Password is required for protected channels',
        );
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    } else if (data.type !== 'PROTECTED') {
      data.password = null;
    }
    const updatedChannel = await this.prismaService.channel.update({
      where: { id: channelId },
      data: data,
    });
    return updatedChannel;
  }

  async deleteChannel(channelId: string, userId: string) {
    const channel = await this.prismaService.channel.findUnique({
      where: { id: channelId },
    });
    if (!channel) {
      throw new BadRequestException(`Channel not found.`);
    }
    if (channel.ownerId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this channel.',
      );
    }
    await this.prismaService.message.deleteMany({
      where: { channelId: channelId },
    });

    await this.prismaService.channelMembership.deleteMany({
      where: { channelId: channelId },
    });

    await this.prismaService.channel.delete({
      where: { id: channelId },
    });
  }

  async joinChannel() {}
}
