import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
const Fuse = require('fuse.js');

@Injectable()
export class GameService {
  constructor(
    private prismaService: PrismaService,
  ) { }


  
}