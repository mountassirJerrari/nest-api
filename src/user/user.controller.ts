import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserdto } from './dto/CreateUserDto';
import { UserService } from './services/user/user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService ) {

    }
    @Get()
    async getAll() {
        return await this.userService.findAll()
    }
   
    @Get(':id')
    async getOne(@Param('id' , ParseIntPipe) id : number) {
        return await this.userService.findOne(id)
    }
    @Post()
    async createUser(@Body() data: CreateUserdto) {
     await this.userService.create(data) ;
        return data 
    }
    @Delete(':id')
    async deleteUser(@Param('id' , ParseIntPipe) id : number){
      return  await this.userService.remove(id)
    }

}
