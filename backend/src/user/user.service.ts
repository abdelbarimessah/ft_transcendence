import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// import { error, log } from 'console';
import { NotificationService } from 'src/notification/notification.service';
// import * as Fuse from 'fuse.js';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Fuse = require('fuse.js');

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private notificationService: NotificationService,
  ) {}

  async getAllUsers() {
    const users = await this.prismaService.user.findMany();

    for (const user of users) {
      delete user.secretOpt;
      delete user.email;
      delete user.otpIsEnabled;
    }
    return users;
  }

  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        providerId: id,
      },
      include: {
        friendOf: true,
      },
    });

    return user;
  }

  async uploadImage(imageUrl: string, id: string) {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });
      const uploadDir = path.join(__dirname, '../../../uploads/');
      const uploadPath = path.join(uploadDir, `${id}${'.png'}`);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(uploadPath, response.data);
    } catch (error) {
      console.error(
        'error in the upload of the image in the backend',
        error.message,
      );
    }
  }

  async updateAvatar(id: string, avatarPath: string) {
    return this.prismaService.user.update({
      where: { providerId: id },
      data: { avatar: avatarPath },
    });
  }
  
  async updateCover(id: string, coverPath: string) {
    return this.prismaService.user.update({
      where: { providerId: id },
      data: { cover: coverPath },
    });
  }

  async updateUserData(providerId: string, data: any) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { nickName: data.nickName },
    });

    if (existingUser && existingUser.providerId !== providerId) {
      throw new BadRequestException('nick name already in use');
    }
    return this.prismaService.user.update({
      where: { providerId: providerId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        nickName: data.nickName,
      },
    });
  }

  async getLeaders() {
    const users = await this.prismaService.user.findMany({
      orderBy: {
        level: 'desc',
      },
      take: 3,
    });

    for (const user of users) {
      delete user.secretOpt;
      delete user.email;
      delete user.otpIsEnabled;
    }
    return users;
  }

  async getAchievements(id: string) {
    const userWithAchievements = await this.prismaService.user.findUnique({
      where: {
        providerId: id,
      },
      include: {
        achievements: true,
      },
    });

    return userWithAchievements?.achievements;
  }

  async getFriends(id: string) {
    try {
      const userWithFriends = await this.prismaService.user.findUnique({
        where: {
          providerId: id,
        },
        include: {
          friends: true,
        },
      });
      if (userWithFriends?.friends) {
        for (const user of userWithFriends.friends) {
          delete user.secretOpt;
          delete user.email;
          delete user.otpIsEnabled;
        }
      }
      return userWithFriends?.friends;
    } catch (err) {
      console.log(err.message);
    }
  }

  async getUserSearch(query: string, id: string) {
    const users = await this.prismaService.user.findMany({
      where: { providerId: { not: id } },
    });

    const queryArr = query.split(' ');
    const keys: (keyof User)[] = ['nickName', 'firstName', 'lastName'];
    const fuse = new Fuse(users, { keys, threshold: 0.2 });
    const filtered = fuse.search(queryArr[0]).map((elem) => elem.item);

    for (const user of filtered) {
      delete user.secretOpt;
      delete user.email;
      delete user.otpIsEnabled;
      delete user.sockets;
    }
    return { filtered };
  }

  async addFriend(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new BadRequestException("You can't add yourself as a friend");
    }
    const friend = await this.prismaService.user.findUnique({
      where: {
        providerId: friendId,
      },
    });
    if (!friend) throw new BadRequestException("user doesn't exists");
    const user = await this.prismaService.user.update({
      where: {
        providerId: userId,
      },
      data: {
        friends: {
          connect: {
            providerId: friendId,
          },
        },
      },
    });
    await this.notificationService.friendRequestNotification(
      user.id,
      friend.id,
      friendId,
    );
    return { message: 'Friend added' };
  }

  async removeFriend(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new BadRequestException("You can't add yourself as a friend");
    }
    await this.prismaService.user.update({
      where: {
        providerId: userId,
      },
      data: {
        friends: {
          disconnect: {
            providerId: friendId,
          },
        },
      },
    });
    return { message: 'Friend added' };
  }

  async findOrCreate(data: Prisma.UserCreateInput) {
    let user: User | null = null;
    let suffix = '';

    console.log('data', data);
    const achievements = [
      'ach1',
      'ach2',
      'ach3',
      'ach4',
      'ach5',
      'ach6',
      'ach7',
    ];
    while (!user) {
      try {
        user = await this.prismaService.user.upsert({
          create: {
            ...data,
            nickName: `${data.nickName}${suffix}`,
            achievements: {
              create: achievements.map((name) => ({ name, locked: false })),
            },
          },
          update: {},
          where: { providerId: data.providerId },
        });
      } catch (error) {
        if (
          !(error instanceof PrismaClientKnownRequestError) ||
          error.code !== 'P2002'
        )
          throw error;

        suffix = `-${uuid.v4().substring(0, 5)}`;
      }
    }
    return user;
  }
}
