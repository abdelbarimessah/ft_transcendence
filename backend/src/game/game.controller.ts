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
    await this.gameService.addGameData(user.id, gameData);
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
