import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UsersController {

    constructor(private readonly userService: UserService){

    }

    @Get('All') // Get /users or /users?role=value
    findAll() {
        return this.userService.getAllUsers();
    }
    @Get(':id') // Get /users/1
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }

}
 
