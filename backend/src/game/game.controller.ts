import {  Controller } from '@nestjs/common';
import { GameService } from './game.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('game')
export class GameController {

    constructor(
        private gameService: GameService,
        private prismaService: PrismaService,
    )
    {}
    
}

 
