
import { GameService } from './game.service';
import {  Controller, Post, UseGuards, Req } from '@nestjs/common';
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

        // console.log('result [game-controller]', result);
        
    }
}

 
