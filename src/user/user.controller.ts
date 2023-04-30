import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserdto } from './dtos/CreateUserDto';
import { UserService } from './services/user/user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {

    }
    @Get()
    async getAll() {
        return await this.userService.findAll()
    }
    @Post()
    createUser(@Body() data: CreateUserdto) {
     this.userService.create(data) ;
        return data

    }
}
