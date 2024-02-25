import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
// import { Prisma } from '@prisma/client';
// import { Request } from 'express';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  JoinChannelDto,
  UpdateChannelDto,
  createChannelDto,
  userIdDto,
  newMessageDto,
  userMuteDto,
  searchChannelsDto,
} from './chat.dto';
import * as bcrypt from 'bcrypt';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { OTPGuard } from 'src/auth/Otp.guard';
import { ChatService } from './chat.service';
import { NotificationService } from 'src/notification/notification.service';
import { AuthGuard } from '@nestjs/passport';

// move logic to chatService
@UseGuards(OTPGuard)
@UseGuards(AuthGuard('jwt'))
@Controller('chat')
export class ChatController {
  constructor(
    private prismaService: PrismaService,
    private chatGateway: ChatGateway,
    private chatService: ChatService,
    private notificationService: NotificationService,
  ) {}
  @Post('create') // POST /chat/create : create new chat (send body with req)
  async createChat(@CurrentUser() user: any, @Body() data: userIdDto) {
    const currentUser = user;
    const userToChatId = await this.chatService.getUserId(data.userId);
    const chatPairHash = this.chatService.generateChatPairHash(
      currentUser.id,
      userToChatId,
    );
    let chat = await this.prismaService.chat.findUnique({
      where: {
        chatPairHash,
      },
    });
    if (!chat) {
      chat = await this.chatService.createChat(
        currentUser.id,
        userToChatId,
        chatPairHash,
      );
    }
    this.chatGateway.joinRoom(currentUser.id, chat.id);
    this.chatGateway.newChat(userToChatId, chat);
    return chat;
  }
  @Get('all') // GET /chat/all : return all the chat of the current user
  async getUserChats(@CurrentUser() user: any) {
    const userId = user.id;
    const userChats = await this.chatService.getUserChats(userId);
    const chats = userChats ? userChats.chats : [];
    chats.forEach((chat) => {
      this.chatGateway.joinRoom(chat.members[0].id, chat.id);
      this.chatGateway.joinRoom(chat.members[1].id, chat.id);
    });
    return chats;
  }
  @Get('get/:id') // GET /chat/:id return the messages of the chat
  async getChat(@Param('id') id: string, @CurrentUser() user: any) {
    const userId = user.id;
    const chat = await this.chatService.getChatMessages(id, userId);

    if (!chat) {
      throw new NotFoundException(
        "Chat not found or you aren't part of the chat",
      );
    }
    return chat;
  }

  @Post('message')
  async sendMessage(@Body() data: newMessageDto, @CurrentUser() user: any) {
    const userId = user.id;
    const { content, chatId, channelId } = data;
    if (!chatId && !channelId) {
      throw new NotFoundException('a chat or channel must be provided');
    }
    let receiverId;
    const targetId = await this.chatService.checkChat(chatId, channelId);
    if (chatId) {
      this.chatService.isBlocked(chatId, userId);
      receiverId =
        targetId.members[1].id == user.id
          ? targetId.members[1].id
          : targetId.members[0].id;
    } else if (channelId) {
      this.chatService.isBanned(channelId, userId);
      this.chatService.isMuted(channelId, userId);
    }
    const message = await this.prismaService.message.create({
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
    this.chatGateway.sendMessage(targetId.id, message);
    if (chatId) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const notify = await this.notificationService.messageNotification(
        user.id,
        receiverId,
        chatId,
      );
    }
    return message;
  }
  // maybe i won't need it cuz i get the messages when i get the chat
  @Get('message/:chatId')
  async getMessages(@Param('chatId') chatId: string, @CurrentUser() user: any) {
    const userId = user.id;
    const chat = await this.prismaService.chat.findFirst({
      where: {
        id: chatId,
        members: {
          some: {
            id: userId,
          },
        },
      },
      select: {
        messages: true,
      },
    });
    if (!chat) {
      throw new NotFoundException(
        'chat not found or the user not part of the chat',
      );
    }
    return chat.messages;
  }

  @Post('channel/create')
  async createChannel(
    @Body() data: createChannelDto,
    @CurrentUser() user: any,
  ) {
    const userId = user.id;
    try {
      let hashedPassword = null;
      if (data.type === 'PROTECTED') {
        if (!data.password)
          throw new BadRequestException("there's no password");
        hashedPassword = await bcrypt.hash(data.password, 10);
      }

      const channel = await this.prismaService.channel.create({
        data: {
          name: data.name,
          type: data.type,
          password: hashedPassword,
          ownerId: userId,
          members: {
            create: [{ userId: userId, isAdmin: true }],
          },
        },
      });
      this.chatGateway.joinRoom(userId, channel.id);
      return channel;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ConflictException(
          'A channel with the given name already exists.',
        );
      }
      throw err;
    }
  }
  @Get('channel')
  async getChannels(@CurrentUser() user: any) {
    const userId = user.id;
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
      throw new NotFoundException('No channels found for the user.');
    }
    const channels = memberships.map((membership) => {
      this.chatGateway.joinRoom(userId, membership.channel.id);
      return membership.isBanned ? {} : membership.channel;
    });

    return channels;
    // return memberships;
  }
  @Patch('channel/:id')
  async updateChannel(
    @Body() data: UpdateChannelDto,
    @Param('id') channelId: string,
    @CurrentUser() user: any,
  ) {
    const userId = user.id;
    const channel = await this.prismaService.channel.findUnique({
      where: { id: channelId },
    });
    if (!channel) {
      throw new NotFoundException(`Channel not found`);
    }
    if (channel.ownerId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this channel',
      );
    }
    const updateData: any = {};
    updateData.name = data.name ? data.name : undefined;
    updateData.type = data.type ? data.type : undefined;
    if (data.type === 'PROTECTED' && data.password) {
      if (data.password.length === 0) {
        throw new BadRequestException(
          'Password is required for protected channels',
        );
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData.password = hashedPassword;
    } else if (data.type !== 'PROTECTED') {
      updateData.password = null;
    }
    const updatedChannel = await this.prismaService.channel.update({
      where: { id: channelId },
      data: updateData,
    });
    this.chatGateway.updateChannel(channelId, updatedChannel);
    return updatedChannel;
  }
  @Delete('channel/:id')
  async deleteChannel(
    @Param('id') channelId: string,
    @CurrentUser() user: any,
  ) {
    const channel = await this.prismaService.channel.findUnique({
      where: { id: channelId },
    });
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${channelId} not found.`);
    }
    if (channel.ownerId !== user.id) {
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
    this.chatGateway.deleteChannel(channelId);
    return { message: `Channel with ID ${channelId} has been deleted.` };
  }
  @Post('channel/:id/join')
  async joinChannel(
    @CurrentUser() user: any,
    @Param('id') channelId: string,
    @Body() body: JoinChannelDto,
  ) {
    const userId = user.id;

    const channel = await this.prismaService.channel.findUnique({
      where: { id: channelId },
    });
    if (!channel) {
      throw new NotFoundException(`Channel not found`);
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
        isAdmin: false,
        isMuted: false,
        isBanned: false,
      },
    });
    this.chatGateway.joinRoom(userId, channelId);
    this.chatGateway.userJoined(channelId, user);
    return { message: 'User added to the channel successfully' };
  }
  @Post('channel/:id/leave')
  async leaveChannel(@Param('id') channelId: string, @CurrentUser() user: any) {
    const channel = await this.prismaService.channel.findUnique({
      where: { id: channelId },
    });
    if (!channel) {
      throw new NotFoundException(`Channel not found with ID ${channelId}`);
    }
    const membership = await this.prismaService.channelMembership.findUnique({
      where: {
        channelId_userId: {
          channelId: channelId,
          userId: user.id,
        },
      },
    });

    if (!membership) {
      throw new NotFoundException(
        `User is not a member of the channel ${channelId}`,
      );
    }
    if (channel.ownerId === user.id) {
      throw new BadRequestException(
        `Channel owner cannot leave the channel directly.`,
      );
    }
    await this.prismaService.channelMembership.delete({
      where: {
        channelId_userId: {
          channelId: channelId,
          userId: user.id,
        },
      },
    });
    this.chatGateway.userLeft(channelId, user);
    return { message: `User has successfully left the channel ${channelId}.` };
  }
  @Post('channel/:id/admin')
  async addAdmin(
    @Param('id') channelId: string,
    @CurrentUser() user: any,
    @Body() body: userIdDto,
  ) {
    const currentUserMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId,
            userId: user.id,
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
            userId: body.userId,
          },
        },
      });

    if (!targetUserMembership) {
      throw new NotFoundException(
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
          userId: body.userId,
        },
      },
      data: {
        isAdmin: true,
      },
    });
    this.chatGateway.addAdmin(channelId, body.userId);
    return {
      message: `User has been made an admin of the channel .`,
    };
  }
  @Delete('channel/:id/admin')
  async removeAdmin(
    @Param('id') channelId: string,
    @CurrentUser() user: any,
    @Body() body: userIdDto,
  ) {
    const channelMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId: channelId,
            userId: user.id,
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
            userId: body.userId,
          },
        },
      });

    if (!targetAdminMembership || !targetAdminMembership.isAdmin) {
      throw new NotFoundException(
        'The specified user is not an admin of this channel.',
      );
    }
    await this.prismaService.channelMembership.update({
      where: {
        channelId_userId: {
          channelId: channelId,
          userId: body.userId,
        },
      },
      data: {
        isAdmin: false,
      },
    });
    this.chatGateway.removeAdmin(channelId, body.userId);
    return { message: 'Admin rights removed successfully.' };
  }
  @Post('channel/:id/mute')
  async muteMember(
    @Param('id') channelId: string,
    @CurrentUser() user: any,
    @Body() body: userMuteDto,
  ) {
    const channelMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId: channelId,
            userId: user.id,
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
      throw new NotFoundException(
        'The specified user is not a member of this channel.',
      );
    }
    if (targetMembership.userId === channelMembership.channel.ownerId) {
      throw new ForbiddenException('Cannot mute the owner of the channel.');
    }

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
          expiresAt: body.expiresAt,
        },
      },
    );
    this.chatGateway.muteUser(
      channelId,
      body.userId,
      !updatedMembership.isMuted,
    );
    return updatedMembership.isMuted
      ? { message: 'User has been muted successfully.' }
      : { message: 'User has been unmuted successfully.' };
  }
  @Post('channel/:id/ban')
  async banMember(
    @Param('id') id: string,
    @CurrentUser() user: any,
    targetId: userIdDto,
  ) {
    const membership = await this.prismaService.channelMembership.findUnique({
      where: {
        channelId_userId: {
          channelId: id,
          userId: user.id,
        },
      },
      include: {
        channel: true,
      },
    });

    if (!membership) {
      throw new NotFoundException('You are not a member of this channel.');
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
            channelId: id,
            userId: targetId.userId,
          },
        },
      });

    if (!targetMembership) {
      throw new NotFoundException(
        'The target user is not a member of this channel.',
      );
    }
    if (targetMembership.userId === membership.channel.ownerId) {
      throw new ForbiddenException('Cannot ban the owner of the channel.');
    }

    await this.prismaService.channelMembership.update({
      where: {
        channelId_userId: {
          channelId: id,
          userId: targetId.userId,
        },
      },
      data: {
        isBanned: !targetMembership.isBanned,
      },
    });
    this.chatGateway.banUser(id, targetId.userId, !targetMembership.isBanned);
    return !targetMembership.isBanned
      ? { message: 'User has been banned successfully.' }
      : { message: 'User has been unbanned successfully.' };
  }
  @Post('channel/:id/kick')
  async kickMember(
    @Param('id') channelId: string,
    @CurrentUser() user: any,
    @Body() body: userIdDto,
  ) {
    const adminMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId,
            userId: user.id,
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
      throw new NotFoundException('Channel does not exist.');
    }

    if (body.userId === channel.ownerId) {
      throw new ForbiddenException('Cannot kick the owner of the channel.');
    }

    const targetMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId,
            userId: body.userId,
          },
        },
      });

    if (!targetMembership) {
      throw new NotFoundException(
        'The specified user is not a member of the channel.',
      );
    }

    await this.prismaService.channelMembership.delete({
      where: {
        channelId_userId: {
          channelId,
          userId: body.userId,
        },
      },
    });
    this.chatGateway.kickUser(channelId, user.id);
    return { message: 'User has been kicked from the channel.' };
  }
  @Get('channel/:id/members')
  async getChannelMembers(@Param('id') channelId, @CurrentUser() user: any) {
    const channelMembership =
      await this.prismaService.channelMembership.findFirst({
        where: {
          channelId: channelId,
          userId: user.id,
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
            user: true,
          },
        },
      },
    });

    const members = channelWithMembers.members.map(
      (membership) => membership.user,
    );

    return members;
  }
  @Get('channel/:id/messages')
  async getChannelMessages(
    @Param('id') channelId: string,
    @CurrentUser() user: any,
  ) {
    const channelWithMessages = await this.prismaService.channel.findUnique({
      where: {
        id: channelId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        members: {
          where: {
            userId: user.id,
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
  @Post('channel/:id/add')
  async addUserToChannel(
    @Param('id') channelId: string,
    @CurrentUser() user: any,
    @Body() body: userIdDto,
  ) {
    const adminMembership =
      await this.prismaService.channelMembership.findUnique({
        where: {
          channelId_userId: {
            channelId,
            userId: user.id,
          },
        },
      });

    if (!adminMembership || !adminMembership.isAdmin) {
      throw new ForbiddenException(
        'You must be an admin of this channel to add members.',
      );
    }

    const targetUser = await this.prismaService.user.findUnique({
      where: {
        id: body.userId,
      },
    });

    if (!targetUser) {
      throw new NotFoundException('User does not exist.');
    }

    await this.prismaService.channelMembership.upsert({
      where: {
        channelId_userId: {
          channelId,
          userId: body.userId,
        },
      },
      create: {
        channelId,
        userId: body.userId,
        isAdmin: false,
      },
      update: {
        isBanned: false,
      },
    });
    this.chatGateway.userJoined(channelId, targetUser);
    return { message: 'User successfully added to the channel.' };
  }
  @Get('channel/all')
  async getAllChannel() {
    const channels = await this.prismaService.channel.findMany({
      where: {
        type: {
          in: ['PROTECTED', 'PUBLIC'],
        },
      },
    });
    return channels;
  }
  @Get('channel/search')
  async searchChannels(@Query() query: searchChannelsDto) {
    const { keyword } = query;
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
  @Post('block')
  async blockUser(@CurrentUser() user: any, @Body() targetUserId: userIdDto) {
    if (user.id === targetUserId.userId) {
      throw new BadRequestException('You cannot block yourself.');
    }

    const targetUser = await this.prismaService.user.findUnique({
      where: {
        id: targetUserId.userId,
      },
    });
    if (!targetUser) {
      throw new NotFoundException('Target user not found.');
    }

    const alreadyBlocked = await this.prismaService.user.findFirst({
      where: {
        id: user.id,
        blockedUsers: {
          some: {
            id: targetUserId.userId,
          },
        },
      },
    });

    if (alreadyBlocked) {
      throw new BadRequestException('User is already blocked.');
    }

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        blockedUsers: {
          connect: {
            id: targetUser.id,
          },
        },
      },
    });
  }
  @Post('unblock')
  async unblockUser(@CurrentUser() user: any, @Body() targetUserId: userIdDto) {
    if (user.id === targetUserId.userId) {
      throw new BadRequestException('You cannot unblock yourself');
    }

    // Check if the target user exists
    const targetUser = await this.prismaService.user.findUnique({
      where: {
        id: targetUserId.userId,
      },
    });
    if (!targetUser) {
      throw new NotFoundException('Target user not found.');
    }

    // Check if the target user is currently blocked
    const isBlocked = await this.prismaService.user.findFirst({
      where: {
        id: user.id,
        blockedUsers: {
          some: {
            id: targetUserId.userId,
          },
        },
      },
    });

    if (!isBlocked) {
      throw new BadRequestException('User is not blocked.');
    }

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        blockedUsers: {
          disconnect: {
            id: targetUser.id,
          },
        },
      },
    });
  }
}

/**To-do: -check mute and ban in channel methods,
 *        -check privet channel access in channel methods,
 *
 * */
