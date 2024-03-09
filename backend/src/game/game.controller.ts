import { GameService } from './game.service';
import { Controller, Post, UseGuards, Req, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OTPGuard } from 'src/auth/Otp.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@UseGuards(OTPGuard)
@UseGuards(AuthGuard('jwt'))
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) { }

  @Post('gameData')
  async gameData(@Req() req: Request, @CurrentUser() user: any) {
    const gameData = req.body;
    // const providderId = gameData.userId;
    await this.gameService.addGameData(user.providerId, gameData);
  }

  @Get('winFriendMode/:id')
  async getWinFriendMode(@Req() req: Request, @Param('id') id: string) {
    return this.gameService.getNumberOfWiningMatchFriendMode(id);
  }

  @Get('winRandomMode/:id')
  async getWinRandomMode(@Req() req: Request, @Param('id') id: string) {
    return this.gameService.getNumberOfWiningMatchRandomMode(id);
  }

  @Get('matchHistory/:id')
  async handleMatchHistory(@Req() req: Request, @Param('id') id: string) {
    const result = await this.gameService.getMatchHistory(id);

    return result;
  }
}
