import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
const Fuse = require('fuse.js');

@Injectable()
export class GameService {
  constructor(
    private prismaService: PrismaService,
  ) { }
  
  async addGameData(id: number, gameData: any) {
    let {opponentId,userIds, userScore, opponentScore, status } = gameData;
    console.log('gameData [in the service]', gameData);
    const game = await this.prismaService.game.create({
      data: {
        opponentId,
        userIds,
        userScore,
        opponentScore,
        status,
        user: {
          connect: {
            id: id, 
          },
        },
      },
    });
    return game;
  }
}