import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
const Fuse = require('fuse.js');

@Injectable()
export class GameService {
  constructor(private prismaService: PrismaService) { }

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
      const friendModeCount = await this.prismaService.game.count({
        where: {
          gameType: 'friendMode',
          status:'win',
          userId: id,
        },
        
      })
      const randomdModeCount = await this.prismaService.game.count({
        where: {
          gameType: 'randomMode',
          status:'win',
          userId: id,
        },
        
      })
      console.log('the number of the game in the friend mode', randomdModeCount);
      

      return game;
    }
  }

  //TODO add the level && achievement of the user after storing the game 


  async getMatchHistory(userId: string) {
    const games = await this.prismaService.game.findMany({
      where: {
        userId: userId,
      },
    });
    return games;
  }
}
