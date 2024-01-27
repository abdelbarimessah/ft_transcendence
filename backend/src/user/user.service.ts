import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as uuid from 'uuid';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
  ) {}


  async getAllUsers() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
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
          where: { privderId : data.privderId },
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


