import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){

    }

    @Get() // Get /users or /users?role=value
    findAll(@Query('role') role?: 'admin' | 'user') {
        return this.usersService.findAll(role)
    }


    @Get(':id') // Get /users/:id
    findOne(@Param('id', ParseIntPipe ) id: number) {
        return this.usersService.findOne(id)
    }
    
    @Post() // Post /users
    create(@Body() user: {name: string, role: 'admin' | 'user'}) {
        return this.usersService.create(user)
    }
    
    @Patch(':id') // Patch /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body() userUpadate: {}) {
        return this.usersService.update(id, userUpadate)
    }
    @Delete(':id') // Delete /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }
}
 
