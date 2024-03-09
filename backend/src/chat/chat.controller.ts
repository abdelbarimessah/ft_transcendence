import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
import { CurrentUser } from 'src/auth/current-user.decorator';
import { OTPGuard } from 'src/auth/Otp.guard';
import { ChatService } from './chat.service';
import { NotificationService } from 'src/notification/notification.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid4 } from 'uuid';
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
  @Post('create')
  async createChat(@CurrentUser() user: User, @Body() data: userIdDto) {
    const currentUser = user;
    const userToChatId = await this.chatService.checkUserId(data.userId);
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
    delete chat.chatPairHash
    delete chat.updatedAt
    delete chat.createdAt
    this.chatGateway.joinRoom(currentUser.id, chat.id);
    this.chatGateway.newChat(userToChatId, chat);
    return chat;
  }
  @Get('all')
  async getUserChats(@CurrentUser() user: User) {
    const userId = user.id;
    const userChats = await this.chatService.getUserChats(userId);
    const chats = userChats ? userChats.chats : [];
    chats.forEach((chat) => {
      this.chatGateway.joinRoom(chat.members[0].id, chat.id);
      this.chatGateway.joinRoom(chat.members[1].id, chat.id);
      delete chat.members[0].secretOpt;
      delete chat.members[1].secretOpt;
    });
    return chats;
  }
  @Get('get/:id')
  async getChat(@Param('id') id: string, @CurrentUser() user: User) {
    const userId = user.id;
    const chat = await this.chatService.getChatMessages(id, userId);

    if (!chat) {
      throw new BadRequestException(
        "Chat not found or you aren't part of the chat",
      );
    }
    return chat;
  }

  @Post('message')
  async sendMessage(@Body() data: newMessageDto, @CurrentUser() user: User) {
    const userId = user.id;
    const { content, chatId, channelId } = data;
    if (!chatId && !channelId) {
      throw new BadRequestException('a chat or channel must be provided');
    }
    let receiverId;
    const targetId = await this.chatService.checkChat(chatId, channelId);
    if (chatId) {
      await this.chatService.isBlocked(chatId, userId);
      receiverId =
        targetId.members[1].id == user.id
          ? targetId.members[0].id
          : targetId.members[1].id;
    } else if (channelId) {
      await this.chatService.isBanned(channelId, userId);
      await this.chatService.isMuted(channelId, userId);
    }
    const message = await this.chatService.createMessage(
      userId,
      chatId,
      channelId,
      content,
    );
    this.chatGateway.sendMessage(targetId.id, message);
    if (chatId) {
      await this.notificationService.messageNotification(
        user.id,
        receiverId,
        chatId,
      );
    }
    return message;
  }
  @Get('message/:chatId')
  async getMessages(
    @Param('chatId') chatId: string,
    @CurrentUser() user: User,
  ) {
    const userId = user.id;
    const chat = await this.chatService.getChatMessages(chatId, userId);
    if (!chat) {
      throw new BadRequestException(
        'chat not found or the user not part of the chat',
      );
    }
    return chat.messages;
  }

  @Post('channel/create')
  async createChannel(
    @Body() data: createChannelDto,
    @CurrentUser() user: User,
  ) {
    const userId = user.id;
    try {
      const channel = await this.chatService.createChannel(data, userId);
      this.chatGateway.joinRoom(userId, channel.id);
      delete channel.password;
      return channel;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new BadRequestException(
          'A channel with the given name already exists.',
        );
      }
      throw err;
    }
  }
  @Get('channel')
  async getChannels(@CurrentUser() user: User) {
    const userId = user.id;

    const channels = await this.chatService.getUserChannels(userId);

    return channels;
  }

  @Patch('channel/:id')
  async updateChannel(
    @Body() data: UpdateChannelDto,
    @Param('id') channelId: string,
    @CurrentUser() user: User,
  ) {
    const userId = user.id;
    const updatedChannel = await this.chatService.updateChannel(
      channelId,
      userId,
      data,
    );
    delete updatedChannel.password;
    this.chatGateway.updateChannel(channelId, updatedChannel);
    return updatedChannel;
  }

  @Delete('channel/:id')
  async deleteChannel(
    @Param('id') channelId: string,
    @CurrentUser() user: User,
  ) {
    this.chatService.deleteChannel(channelId, user.id);
    this.chatGateway.deleteChannel(channelId);
    return { message: `Channel with ID ${channelId} has been deleted.` };
  }

  @Post('channel/:id/join')
  async joinChannel(
    @CurrentUser() user: User,
    @Param('id') channelId: string,
    @Body() body: JoinChannelDto,
  ) {
    const userId = user.id;
    const channelMembership = await this.chatService.joinChannel(
      channelId,
      userId,
      body,
    );
    this.chatGateway.joinRoom(userId, channelId);
    this.chatGateway.userJoined(channelMembership.channelId, channelMembership);
    return channelMembership.channel;
  }

  @Post('channel/:id/leave')
  async leaveChannel(
    @Param('id') channelId: string,
    @CurrentUser() user: User,
  ) {
    await this.chatService.leaveChannel(channelId, user.id);
    this.chatGateway.userLeft(channelId, user.id);
    this.chatGateway.leaveRoom(user.id, channelId);
    return { message: `User has successfully left the channel.` };
  }

  @Post('channel/:id/admin')
  async addAdmin(
    @Param('id') channelId: string,
    @CurrentUser() user: User,
    @Body() body: userIdDto,
  ) {
    const updatedMembership = await this.chatService.addAdmin(
      channelId,
      user.id,
      body.userId,
    );
    this.chatGateway.addAdmin(channelId, updatedMembership);
    return updatedMembership;
  }

  @Delete('channel/:id/admin')
  async removeAdmin(
    @Param('id') channelId: string,
    @CurrentUser() user: User,
    @Body() body: userIdDto,
  ) {
    const updatedMembership = await this.chatService.removeAdmin(
      channelId,
      user.id,
      body.userId,
    );
    this.chatGateway.removeAdmin(channelId, updatedMembership);
    return updatedMembership;
  }

  @Post('channel/:id/mute')
  async muteMember(
    @Param('id') channelId: string,
    @CurrentUser() user: User,
    @Body() body: userMuteDto,
  ) {
    const updatedMembership = await this.chatService.muteMember(
      channelId,
      user.id,
      body,
    );
    this.chatGateway.muteUser(channelId, updatedMembership);
    return updatedMembership;
  }

  @Post('channel/:id/unmute')
  async unmuteMember(
    @Param('id') channelId: string,
    @CurrentUser() user: User,
    @Body() body: userMuteDto,
  ) {
    const updatedMembership = await this.chatService.unmuteMember(
      channelId,
      user.id,
      body,
    );
    this.chatGateway.unmuteUser(channelId, updatedMembership);
    return updatedMembership;
  }

  @Post('channel/:id/ban')
  async banMember(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() targetId: userIdDto,
  ) {
    const updatedMembership = await this.chatService.banMember(
      id,
      user.id,
      targetId.userId,
    );
    this.chatGateway.banUser(id, targetId.userId);
    this.chatGateway.leaveRoom(targetId.userId, id);

    return updatedMembership;
  }

  @Post('channel/:id/kick')
  async kickMember(
    @Param('id') channelId: string,
    @CurrentUser() user: User,
    @Body() body: userIdDto,
  ) {
    await this.chatService.kickMember(channelId, user.id, body.userId);
    this.chatGateway.kickUser(channelId, body.userId);
    return { message: 'User has been kicked from the channel.' };
  }

  @Get('channel/:id/members')
  async getChannelMembers(@Param('id') channelId, @CurrentUser() user: User) {
    const members = await this.chatService.getChannelMembers(
      channelId,
      user.id,
    );
    return members;
  }

  @Get('channel/:id/messages')
  async getChannelMessages(
    @Param('id') channelId: string,
    @CurrentUser() user: User,
  ) {
    const messages = await this.chatService.getChannelMessages(
      channelId,
      user.id,
    );
    return messages;
  }
  @Post('channel/:id/add')
  async addUserToChannel(
    @Param('id') channelId: string,
    @CurrentUser() user: User,
    @Body() body: userIdDto,
  ) {
    const channelMembership = await this.chatService.addUserChannel(
      channelId,
      user.id,
      body.userId,
    );
    this.chatGateway.joinRoom(body.userId, channelId);
    this.chatGateway.userJoined(channelMembership.channelId, channelMembership);
    return channelMembership;
  }
  @Get('channel/all')
  async getAllChannel() {
    const channels = await this.chatService.getAllChannel();
    return channels;
  }
  @Get('channel/search')
  async searchChannels(@Query() query: searchChannelsDto) {
    const { keyword } = query;
    return await this.chatService.searchChannel(keyword);
  }
  @Post('block')
  async blockUser(@CurrentUser() user: User, @Body() targetUserId: userIdDto) {
    const targetUser = await this.chatService.blockUser(user.id, targetUserId.userId);
    this.chatGateway.blockUser(targetUserId.userId, user.id);

    return { id: targetUser.id, providerId: targetUser.providerId };
  }
  @Post('unblock')
  async unblockUser(
    @CurrentUser() user: User,
    @Body() targetUserId: userIdDto,
  ) {
    const targetUser = await this.chatService.unblockUser(user.id, targetUserId.userId);
    this.chatGateway.unblockUser(targetUserId.userId, user.id);
    return { id: targetUser.id, providerId: targetUser.providerId };
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: async (req, file, cb) => {
          const uniqueName = uuid4();
          const ext = extname(file.originalname);
          cb(null, `${uniqueName}${ext}`);
        },
      }),
    }),
  )
  uploadChannelAvatar(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }
    
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';
    const filePath = `${backendUrl}/uploads/${file.filename}`;
    return { avatar: filePath };
  }
}
