import { Module } from '@nestjs/common';
import { FavoriteRecipeController } from './favorite-recipe.controller';
import { FavoriteRecipeService } from './favorite-recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteRecipe } from 'src/entities/FavoriteRecipe';

@Module({
  imports : [TypeOrmModule.forFeature([FavoriteRecipe])],
  controllers: [FavoriteRecipeController ],
  providers: [FavoriteRecipeService]
})
export class FavoriteRecipeModule {}
