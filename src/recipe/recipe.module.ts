import { forwardRef, Module } from '@nestjs/common';
import { Category } from 'src/entities/Category';
import { Recipe } from 'src/entities/Recipe';
import { User } from 'src/entities/User';
import { UserModule } from 'src/user/user.module';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './services/recipe/recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([User , Recipe , Category]) , forwardRef(() => UserModule)],
  controllers: [RecipeController] ,
  providers  :[ RecipeService] ,
  exports : [RecipeService]
})
export class RecipeModule {}
