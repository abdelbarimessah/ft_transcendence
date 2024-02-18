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
  createChatDto,
  newMessageDto,
} from './chat.dto';
import * as bcrypt from 'bcrypt';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { OTPGuard } from 'src/auth/guards/Otp.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';

// move logic to chatService
@UseGuards(OTPGuard)
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(
    private prismaService: PrismaService,
    private chatGateway: ChatGateway,
    private chatService: ChatService,
  ) {}
  @Post('create')
  // i need to add authGuard here and the authGuard should extract userId from JWT token payload and put it in req
  // change req type later to Request
  async createChat(@CurrentUser() user: any, @Body() data: createChatDto) {
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
  @Get('all')
  async getUserChats(@CurrentUser() user: any) {
    const userId = user.id;
    const userChats = await this.chatService.getUserChats(userId);
    //To-do create room for each userChats.chats members
    const chats = userChats ? userChats.chats : [];
    chats.forEach((chat) => {
      this.chatGateway.joinRoom(chat.members[0].id, chat.id);
      this.chatGateway.joinRoom(chat.members[1].id, chat.id);
    });
    return chats;
  }
  @Get(':id')
  async getChat(@Param('id') id: string, @CurrentUser() user: any) {
    const userId = user.id;
    // To-do exclude secret info
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
    const targetId = await this.chatService.checkChat(chatId, channelId);
    if (chatId) {
      this.chatService.isBlocked(chatId, userId);
    } else if (channelId) {
      this.chatService.isBanned(channelId, userId);
    }
    const message = await this.prismaService.message.create({
      data: {
        content,
        authorId: userId,
        ...(chatId && { chatId }),
        ...(channelId && { channelId }),
      },
    });
    this.chatGateway.sendMessage(targetId, message);
    return message;
  }
  // maybe i won't need it cuz i get the messages when i get the chat
  @Get('message/:chatId')
  async getMessages(@Param('chatId') chatId: string, @CurrentUser() user: any) {
    // i should get the message of a chat that the user is part of not any other message
    // To-do the thing below
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
    //To-do extract the id;
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
        channel: true,
      },
    });
    if (!memberships || memberships.length === 0) {
      throw new NotFoundException('No channels found for the user.');
    }
    // const channels = memberships.map((membership) => membership.channel);

    // return channels;
    return memberships;
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

    return { message: 'User added to the channel successfully' };
  }
}
