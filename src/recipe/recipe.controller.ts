import { Controller, Get , Post , Delete, ParseIntPipe, Body, Param  } from '@nestjs/common';
import { CreateRecipeDto } from 'src/dtos/CreateRecipeDto';
import { RecipeService } from './services/recipe/recipe.service';

@Controller('recipe')
export class RecipeController {
 constructor( private recipeService : RecipeService){
     
 }

    @Get()
    async getAll() {
        return await this.recipeService.findAll()
    }
   
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.recipeService.findOne(id)
    }
    @Post()
    async createrecipe(@Body() data: CreateRecipeDto) {
        let userId :number =11 ;
        await this.recipeService.create( userId ,data);
        return data
    }
    @Delete(':id')
    async deleterecipe(@Param('id', ParseIntPipe) id: number) {
        return await this.recipeService.remove(id)
    }
}
