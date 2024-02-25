import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
const Fuse = require('fuse.js');

@Injectable()
export class GameService {
  constructor(private prismaService: PrismaService) {}

  async addGameData(id: string, gameData: any) {
    const {
      opponentId,
      userIds,
      userScore,
      opponentScore,
      status,
      gameName,
      gameType,
    } = gameData;
    const count = await this.prismaService.game.count({
      where: {
        gameName: gameName,
      },
    });
    if (count < 2) {
      const game = await this.prismaService.game.create({
        data: {
          opponentId,
          userIds,
          userScore,
          opponentScore,
          status,
          gameName,
          gameType,
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

  async getMatchHistory(userId: string) {
    const games = await this.prismaService.game.findMany({
      where: {
        userId: userId,
      },
    });
    return games;
  }
}
