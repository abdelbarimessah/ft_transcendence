import { GameService } from './game.service';
import { Controller, Post, UseGuards, Req, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OTPGuard } from 'src/auth/Otp.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post('gameData')
  @UseGuards(OTPGuard)
  @UseGuards(AuthGuard('jwt'))
  async gameData(@Req() req: Request, @CurrentUser() user: any) {
    const gameData = req.body;
    await this.gameService.addGameData(user.providerId, gameData);
  }
  
  
  @Get('winFriendMode/:id')
  @UseGuards(OTPGuard)
  @UseGuards(AuthGuard('jwt'))
  async getWinFriendMode(@Req() req: Request, @Param('id') id: string)
  {
    return this.gameService.getNumberOfWiningMatchFriendMode(id);
  }
  
  @Get('winRandomMode/:id')
  @UseGuards(OTPGuard)
  @UseGuards(AuthGuard('jwt'))
  async getWinRandomMode(@Req() req: Request, @Param('id') id: string)
  {
    return this.gameService.getNumberOfWiningMatchRandomMode(id);
  }


  //TODO add the level when the user win a game
  @Get('matchHistory/:id')
  @UseGuards(OTPGuard)
  @UseGuards(AuthGuard('jwt'))
  async handleMatchHistory(@Req() req: Request, @Param('id') id: string) {
    const result = await this.gameService.getMatchHistory(id);
    return result;
  }
}
