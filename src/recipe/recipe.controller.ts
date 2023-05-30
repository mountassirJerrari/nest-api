import { Controller, Get, Post, Query, Body, Param, Put, Delete } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Ingredient } from 'src/entities/Ingredient';
import { Comment } from 'src/entities/Comment';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) { }


  @Get(':id/comments')
  async getRecipeComments(@Param('id') recipeId: number): Promise<Comment[]> {
    return this.recipeService.getRecipeComments(recipeId);
  }


  @Get()
  async getRecipes(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    console.log(page);
    console.log(limit);


    const recipes = await this.recipeService.getPaginatedRecipes(page, limit);
    return {
      data: recipes,
      page,
      limit,
    };
  }
  @Get()
  getAllRecipes() {
    return this.recipeService.getAllRecipes();
  }

  @Get(':id')
  getRecipeById(@Param('id') id: number) {
    return this.recipeService.getRecipeById(id);
  }

  @Post()
  createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.createRecipe(createRecipeDto);
  }

  @Put(':id')
  updateRecipe(@Param('id') id: number, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.updateRecipe(id, updateRecipeDto);
  }

  @Delete(':id')
  deleteRecipe(@Param('id') id: number) {
    return this.recipeService.deleteRecipe(id);
  }
  @Get(':id/ingredients')
  async getRecipeIngredients(@Param('id') recipeId: number): Promise<Ingredient[]> {
    return this.recipeService.getRecipeIngredients(recipeId);
  }

  @Get(':id/instructions')
  async getInstructionsByRecipeId(@Param('id') id: number) {
    return this.recipeService.getInstructionsByRecipeId(id);
  }
}
