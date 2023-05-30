import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { FavoriteRecipeService } from './favorite-recipe.service';
import { CreateFavoriteRecipeDto } from './dto/create-favorite-recipe.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('favorite-recipes')
export class FavoriteRecipeController {
  constructor(private readonly favoriteRecipeService: FavoriteRecipeService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAllByUser(@Request() req) {
    const userId = req.user.sub;
    console.log(userId);
    
    return this.favoriteRecipeService.findAllByUser(userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createFavoriteRecipeDto: CreateFavoriteRecipeDto, @Request() req) {
    const userId = req.user.id;
    return this.favoriteRecipeService.create(createFavoriteRecipeDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const userId = req.user.id;
    return this.favoriteRecipeService.remove(id, userId);
  }
}
