import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { BadRequestException } from '@nestjs/common';
import axios from "axios";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
  ) { }


  async getAllUsers() {
    const users = await this.prismaService.user.findMany();
    
    return users;
  }

  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        providerId: id,
      },
    });
    return user;
  }

  async uploadImage(imageUrl: string, id: string) {
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const uploadDir = path.join(__dirname, '../../uploads/');
      const uploadPath = path.join(uploadDir, `${id}${'.png'}`);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(uploadPath, response.data);

      // console.log(`Image uploaded to ${uploadPath}`);
    }
    catch (error) {
      // console.log('error', error);
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

  async updateUserData(providerId: string , data :any)
  {
    const existingUser = await this.prismaService.user.findUnique({
      where: { nickName: data.nickName },
    });
    
    if (existingUser && existingUser.providerId !== providerId) {
      console.log('existingUser', existingUser);
      throw new BadRequestException("nick name already in use")
    }
    console.log('data', existingUser);
    console.log('data contunue');
    return this.prismaService.user.update({
      where: { providerId: providerId },
      data: { 
        firstName: data.firstName,
        lastName: data.lastName,
        nickName: data.nickName
      },
    });
  }

  async findOrCreate(data: Prisma.UserCreateInput) {
    let user: User | null = null;
    let suffix = '';

    console.log('data', data);
    while (!user) {
      try {
        user = await this.prismaService.user.upsert({
          create: {
            ...data,
            nickName: `${data.nickName}${suffix}`,
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