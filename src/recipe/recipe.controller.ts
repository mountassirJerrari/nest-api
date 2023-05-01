import { Controller, Get, Post, Delete, ParseIntPipe, Body,  Req , Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateRecipeDto } from 'src/dtos/CreateRecipeDto';
import { Recipe } from 'src/entities/Recipe';
import { RecipeService } from './services/recipe/recipe.service';

@Controller('recipe')
export class RecipeController {
    constructor(private recipeService: RecipeService) {

    }
    @UseGuards(AuthGuard)
    @Get()
    async getAll( @Req() req) {
        
        
        return await this.recipeService.findAll()
    }
    
    @UseGuards(AuthGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.recipeService.findOne(id)
    }
    @UseGuards(AuthGuard)
    @Post()
    async createrecipe(@Body() data: CreateRecipeDto ,  @Req() req) {
    
        let userId: number = req.user.sub;
       let recipe :Recipe =  await this.recipeService.create(userId, data);
        return {...recipe , user : { id: req.sub}}
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleterecipe(@Param('id', ParseIntPipe) id: number   ) {
        return await this.recipeService.remove(id)
    }
}
