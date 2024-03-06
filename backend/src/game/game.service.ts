import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(
    private prismaService: PrismaService
  ) { }

  async addGameData(providerId: string, gameData: any) {
    const { opponentId, userScore, opponentScore, status, gameName, gameType } =
      gameData;
    const count = await this.prismaService.game.count({
      where: {
        gameName: gameName,
      },
    });
    if (count < 2) {
      const game = await this.prismaService.game.create({
        data: {
          opponentId,
          userScore,
          opponentScore,
          status,
          gameName,
          gameType,
          user: {
            connect: {
              providerId: providerId,
            },
          },
        },
      });

      if (status === 'win') await this.addUserLevel(providerId);

      const achievementsToUnlock = [
        { name: 'ach7', count: 50 },
        { name: 'ach6', count: 20, gameType: 'randomMode' },
        { name: 'ach5', count: 20, gameType: 'friendMode' },
        { name: 'ach4', count: 5, gameType: 'randomMode' },
        { name: 'ach3', count: 5, gameType: 'friendMode' },
        { name: 'ach2', count: 1, gameType: 'randomMode' },
        { name: 'ach1', count: 1, gameType: 'friendMode' },
      ];
      const friendMode = await this.getNumberOfWiningMatchFriendMode(providerId);
      const randomMode = await this.getNumberOfWiningMatchRandomMode(providerId);

      for (const { name, count, gameType } of achievementsToUnlock) {
        const winCount = gameType
          ? await this.getNumberOfWiningMatch(gameType, providerId)
          : Math.max(
            friendMode.friendModeCount,
            randomMode.randomModeCount
          );

        if (winCount >= count) {
          const achievement = await this.prismaService.achievement.findFirst({
            where: {
              userId: providerId,
              name: name,
            },
          });

          if (achievement) {
            await this.prismaService.achievement.update({
              where: {
                id: achievement.id,
              },
              data: {
                locked: true,
              },
            });
          }
        }
      }
      return game;
    }
  }
  async addUserLevel(providerId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        providerId: providerId,
      },
    });
    if (user) {
      await this.prismaService.user.update({
        where: {
          providerId: providerId,
        },
        data: {
          level: user.level + 2,
        },
      });
    }
  }

  async getNumberOfWiningMatch(gameType: string, id: string) {
    const winCount = await this.prismaService.game.count({
      where: {
        userId: id,
        gameType: gameType,
        status: 'win',
      },
    });
    return winCount;
  }

  async getNumberOfWiningMatchFriendMode(id: string) {
    const friendModeCount = await this.prismaService.game.count({
      where: {
        userId: id,
        gameType: 'friendMode',
        status: 'win',
      },
    });
    return { friendModeCount };
  }

  async getNumberOfWiningMatchRandomMode(id: string) {
    const randomModeCount = await this.prismaService.game.count({
      where: {
        userId: id,
        gameType: 'randomMode',
        status: 'win',
      },
    });
    return { randomModeCount };
  }

  async getMatchHistory(userId: string) {
    const games = await this.prismaService.game.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    const users = await Promise.all(
      games.map((game) =>
        this.prismaService.user.findUnique({
          where: {
            providerId: game.userId,
          },
        })
      )
    );
    const opponents = await Promise.all(
      games.map((game) =>
        this.prismaService.user.findUnique({
          where: {
            providerId: game.opponentId,
          },
        })
      )
    );

    const result = games.map((game, index) => ({
      game: game,
      user: users[index],
      opponent: opponents[index],
    }));
    return result;
  }

}