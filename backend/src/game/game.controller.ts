
import { GameService } from './game.service';
import {  Controller, Post, UseGuards, Req, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { OTPGuard } from 'src/auth/guards/Otp.guard';


@Controller('game')
export class GameController {

    constructor(
        private gameService: GameService,
    )
    {}

    @Post('gameData')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async gameData(@Req() req : Request, @CurrentUser() user :any)
    {
        const gameData = req.body;
        await this.gameService.addGameData(user.id, gameData);        
    }

    //TODO add the level when the user win a game 
    @Get('matchHistory/:id')
    @UseGuards(OTPGuard)
    @UseGuards(JwtAuthGuard)
    async handleMatchHistory(@Req() req : Request, @Param('id') id: string) {  
        const result = await this.gameService.getMatchHistory(Number(id));
        console.log('the result of the match history is ', result);
        return result
    }
}

 
