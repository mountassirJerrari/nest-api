import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserdto } from '../dtos/CreateUserDto';
import { RecipeService } from '../recipe/services/recipe/recipe.service';
import { UserService } from './services/user/user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService ,private recipeService: RecipeService) {

    }
    @Get()
    async getAll() {
        return await this.userService.findAll()
    }
    @Get(':id/recipes')
    async getAllRecipe(@Param('id' , ParseIntPipe) userId : number) {
        return await this.recipeService.findAllByUserId(userId)
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
