import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from 'src/entities/Ingredient';
import { Recipe } from 'src/entities/Recipe';

@Module({
  imports : [TypeOrmModule.forFeature([Ingredient ,Recipe])] ,
  controllers: [IngredientController],
  providers: [IngredientService]
})
export class IngredientModule {}
