import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  JoinChannelDto,
  UpdateChannelDto,
  createChannelDto,
  userMuteDto,
} from './chat.dto';
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
        avatar: data?.avatar,
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
    if (data.type === 'PROTECTED') {
      if (!data.password || data.password.length === 0) {
        throw new BadRequestException(
          'Password is required for protected channels',
        );
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    } else {
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
  async joinChannel(channelId: string, userId: string, body: JoinChannelDto) {
    const channel = await this.prismaService.channel.findUnique({
      where: { id: channelId },
    });
    if (!channel) {
      throw new BadRequestException(`Channel not found`);
    }
    const isMember = await this.prismaService.channelMembership.findUnique({
      where: {
        channelId_userId: {
          channelId: channelId,
          userId: userId,
        },
      },
    });

    if (isMember) {
      throw new BadRequestException('User is already a member of the channel');
    }
    if (channel.type === 'PROTECTED') {
      if (!body.password) {
        throw new BadRequestException(
          'Password is required to join this channel',
        );
      }
      const isMatch = await bcrypt.compare(body.password, channel.password);
      if (!isMatch) {
        throw new ForbiddenException(
          'Incorrect password for protected channel',
        );
      }
    } else if (channel.type === 'PRIVATE') {
      throw new ForbiddenException(
        'This channel is private and cannot be joined freely',
      );
    }
    await this.prismaService.channelMembership.create({
      data: {
        channelId: channelId,
        userId: userId,
      },
    });
    return channel;
  }
  async leaveChannel(channelId: string, userId: string) {
    const channel = await this.prismaService.channel.findUnique({
      where: { id: channelId },
    });
    if (!channel) {
      throw new BadRequestException(`Channel not found`);
    }
    const membership = await this.prismaService.channelMembership.findUnique({
      where: {
        channelId_userId: {
          channelId: channelId,
          userId: userId,
        },
      },
    });

    if (!membership) {
      throw new BadRequestException(
        `User is not a member of the channel ${channelId}`,
      );
    }
    // if (channel.ownerId === userId) {
    //   const nextAdmin = await this.prismaService.channelMembership.findFirst({
    //     where: {
    //       isAdmin: true,
    //       userId: {
    //         not: userId,
    //       },
    //     },
    //     orderBy: { joinedAt: 'asc' },
    //   });
    //   if (!nextAdmin)
    //     throw new BadRequestException(
    //       'There must be at least one admin to transfer ownership before leaving.`',
    //     );
    //   await this.prismaService.channel.update({
    //     where: {
    //       id: channelId,
    //     },
    //     data: {
    //       ownerId: nextAdmin.userId,
    //     },
    //   });
    // }

    await this.prismaService.channelMembership.delete({
      where: {
        channelId_userId: {
          channelId: channelId,
          userId: userId,
        },
      },
    });
  }
  async addAdmin(channelId: string, userId: string, targetId: string) {
    const currentUserMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId,
            userId: userId,
          },
        },
      });

    if (!currentUserMembership || !currentUserMembership.isAdmin) {
      throw new ForbiddenException(
        'You must be an admin to perform this action.',
      );
    }
    const targetUserMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId,
            userId: targetId,
          },
        },
      });

    if (!targetUserMembership) {
      throw new BadRequestException(
        'Target user is not a member of the channel.',
      );
    }

    if (targetUserMembership.isAdmin) {
      throw new BadRequestException('User is already an admin.');
    }

    await this.prismaService.channelMembership.update({
      where: {
        channelId_userId: {
          channelId,
          userId: targetId,
        },
      },
      data: {
        isAdmin: true,
      },
    });
  }
  async removeAdmin(channelId: string, userId: string, targetId: string) {
    const channelMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId: channelId,
            userId: userId,
          },
        },
        include: {
          channel: {
            select: {
              ownerId: true,
            },
          },
        },
      });
    const channel = channelMembership.channel;
    if (
      !channelMembership ||
      (!channelMembership.isAdmin &&
        channelMembership.userId !== channel.ownerId)
    ) {
      throw new ForbiddenException(
        'You do not have permission to remove an admin.',
      );
    }
    const targetAdminMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId: channelId,
            userId: targetId,
          },
        },
      });

    if (!targetAdminMembership || !targetAdminMembership.isAdmin) {
      throw new BadRequestException(
        'The specified user is not an admin of this channel.',
      );
    }
    await this.prismaService.channelMembership.update({
      where: {
        channelId_userId: {
          channelId: channelId,
          userId: targetId,
        },
      },
      data: {
        isAdmin: false,
      },
    });
  }

  async muteMember(channelId: string, userId: string, body: userMuteDto) {
    const channelMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId: channelId,
            userId: userId,
          },
        },
        include: {
          channel: true,
        },
      });

    if (!channelMembership || !channelMembership.isAdmin) {
      throw new ForbiddenException(
        'You do not have permission to mute members in this channel.',
      );
    }
    const targetMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId: channelId,
            userId: body.userId,
          },
        },
      });

    if (!targetMembership) {
      throw new BadRequestException(
        'The specified user is not a member of this channel.',
      );
    }
    if (targetMembership.userId === channelMembership.channel.ownerId) {
      throw new ForbiddenException('Cannot mute the owner of the channel.');
    }
    const expiresAt = body.expiresAt
      ? body.expiresAt
      : new Date(Date.now() + 5 * 60 * 1000);
    const updatedMembership = await this.prismaService.channelMembership.update(
      {
        where: {
          channelId_userId: {
            channelId: channelId,
            userId: body.userId,
          },
        },
        data: {
          isMuted: !targetMembership.isMuted,
          expiresAt,
        },
      },
    );
    return updatedMembership;
  }

  async banMember(channelId: string, userId: string, targetId: string) {
    const membership = await this.prismaService.channelMembership.findUnique({
      where: {
        channelId_userId: {
          channelId,
          userId,
        },
      },
      include: {
        channel: true,
      },
    });

    if (!membership) {
      throw new BadRequestException('You are not a member of this channel.');
    }
    if (!membership.isAdmin) {
      throw new ForbiddenException(
        'You do not have permission to ban or unban members in this channel.',
      );
    }
    const targetMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId,
            userId: targetId,
          },
        },
      });

    if (!targetMembership) {
      throw new BadRequestException(
        'The target user is not a member of this channel.',
      );
    }
    if (targetMembership.userId === membership.channel.ownerId) {
      throw new ForbiddenException('Cannot ban the owner of the channel.');
    }
    // To-do kick target user from channel
    const updatedMembership = await this.prismaService.channelMembership.update(
      {
        where: {
          channelId_userId: {
            channelId,
            userId: targetId,
          },
        },
        data: {
          isBanned: true, // !targetMembership.isBanned
        },
      },
    );
    return updatedMembership;
  }
  async kickMember(channelId: string, userId: string, targetId: string) {
    const adminMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId,
            userId: userId,
          },
        },
      });

    if (!adminMembership || !adminMembership.isAdmin) {
      throw new ForbiddenException('You must be an admin to kick members.');
    }
    const channel = await this.prismaService.channel.findUnique({
      where: {
        id: channelId,
      },
      select: {
        ownerId: true,
      },
    });

    if (!channel) {
      throw new BadRequestException('Channel does not exist.');
    }

    if (targetId === channel.ownerId) {
      throw new ForbiddenException('Cannot kick the owner of the channel.');
    }

    const targetMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId,
            userId: targetId,
          },
        },
      });

    if (!targetMembership) {
      throw new BadRequestException(
        'The specified user is not a member of the channel.',
      );
    }

    await this.prismaService.channelMembership.delete({
      where: {
        channelId_userId: {
          channelId,
          userId: targetId,
        },
      },
    });
  }
  async getChannelMembers(channelId: string, userId: string) {
    const channelMembership =
      await this.prismaService.channelMembership.findFirst({
        where: {
          channelId: channelId,
          userId: userId,
        },
      });

    if (!channelMembership) {
      throw new ForbiddenException(
        'You are not a member of this channel or the channel does not exist.',
      );
    }

    const channelWithMembers = await this.prismaService.channel.findUnique({
      where: {
        id: channelId,
      },

      include: {
        members: {
          where: {
            isBanned: false,
          },
          include: {
            user: {
              select: {
                id: true,
                provider: true,
                nickName: true,
                firstName: true,
                lastName: true,
                avatar: true,
                level: true,
              },
            }, // To-do select the useful fields
          },
        },
      },
    });

    return channelWithMembers;
  }
  async getChannelMessages(channelId: string, userId: string) {
    const channelWithMessages = await this.prismaService.channel.findUnique({
      where: {
        id: channelId,
      },
      include: {
        messages: {
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
          orderBy: {
            createdAt: 'asc',
          },
        },
        members: {
          // To-do remove this later maybe if i kick banned users
          where: {
            userId: userId,
            isBanned: false,
          },
        },
      },
    });

    if (!channelWithMessages || channelWithMessages.members.length === 0) {
      throw new ForbiddenException('Access to the channel is denied.');
    }
    return channelWithMessages.messages;
  }
  async addUserChannel(channelId: string, userId: string, targetId: string) {
    const adminMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId,
            userId: userId,
          },
        },
        include: {
          channel: true,
        },
      });

    if (!adminMembership || !adminMembership.isAdmin) {
      throw new ForbiddenException(
        'You must be an admin of this channel to add members.',
      );
    }

    const targetUser = await this.prismaService.user.findUnique({
      where: {
        id: targetId,
      },
    });

    if (!targetUser) {
      throw new BadRequestException('User does not exist.');
    }

    await this.prismaService.channelMembership.upsert({
      where: {
        channelId_userId: {
          channelId,
          userId: targetId,
        },
      },
      create: {
        channelId,
        userId: targetId,
        isAdmin: false,
      },
      update: {
        isBanned: false,
      },
    });
    return {targetUser, channel: adminMembership?.channel};
  }
  async getAllChannel() {
    return await this.prismaService.channel.findMany({
      where: {
        type: {
          in: ['PROTECTED', 'PUBLIC'],
        },
      },
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
        ownerId: true,
        avatar: true,
      },
    });
  }
  async searchChannel(keyword: string) {
    return await this.prismaService.channel.findMany({
      where: {
        AND: [
          {
            name: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
          {
            type: {
              not: 'PRIVATE',
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
        ownerId: true,
      },
    });
  }
  async blockUser(userId: string, targetId: string) {
    // need to be optimized
    if (userId === targetId) {
      throw new BadRequestException('You cannot block yourself.');
    }

    const targetUser = await this.prismaService.user.findUnique({
      where: {
        id: targetId,
      },
    });
    if (!targetUser) {
      throw new BadRequestException('Target user not found.');
    }

    const alreadyBlocked = await this.prismaService.user.findFirst({
      where: {
        id: userId,
        blockedUsers: {
          some: {
            id: targetId,
          },
        },
      },
    });
    if (alreadyBlocked) {
      throw new BadRequestException('User is already blocked.');
    }
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        blockedUsers: {
          connect: {
            id: targetUser.id,
          },
        },
      },
    });
    return alreadyBlocked;
  }
  async unblockUser(userId: string, targetId: string) {
    // ? maybe this method should be optimized
    if (userId === targetId) {
      throw new BadRequestException('You cannot unblock yourself');
    }
    const targetUser = await this.prismaService.user.findUnique({
      where: {
        id: targetId,
      },
    });
    if (!targetUser) {
      throw new BadRequestException('Target user not found.');
    }
    const isBlocked = await this.prismaService.user.findFirst({
      where: {
        id: userId,
        blockedUsers: {
          some: {
            id: targetId,
          },
        },
      },
    });

    if (!isBlocked) {
      throw new BadRequestException('User is not blocked.');
    }

    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        blockedUsers: {
          disconnect: {
            id: targetId,
          },
        },
      },
    });
  }
}
