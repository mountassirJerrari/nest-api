import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'src/entities/Recipe';
import { Ingredient } from 'src/entities/Ingredient';
import { Category } from 'src/entities/Category';
import { Media } from 'src/entities/Media';
import { Image } from 'src/entities/Image';
import { Instruction } from 'src/entities/Instruction';
import { RecipeIngredient } from 'src/entities/RecipeIngredient';
import { Comment } from 'src/entities/Comment';
import { FavoriteRecipe } from 'src/entities/FavoriteRecipe';

@Module({
  imports : [TypeOrmModule.forFeature([Recipe , Ingredient, Category , Image , Media , Instruction ,RecipeIngredient ,FavoriteRecipe ,Comment ])] ,
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}
