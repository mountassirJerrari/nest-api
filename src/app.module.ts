import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/User';
import { Recipe } from './entities/Recipe';
import { Utils } from './entities/Utils';
import { Comment } from './entities/Comment';
import { Image } from './entities/Image';
import { Media } from './entities/Media';
import { Ingredient } from './entities/Ingredient';
import { Instruction } from './entities/Instruction';
import { Category } from './entities/Category';
import { CategoryModule } from './category/category.module';
import { UtilsModule } from './utils/utils.module';
import { ImageModule } from './image/image.module';
import { MediaModule } from './media/media.module';
import { RecipeModule } from './recipe/recipe.module';
import { CommentModule } from './comment/comment.module';
import { InstructionModule } from './instruction/instruction.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { FavoriteRecipe } from './entities/FavoriteRecipe';
import { FavoriteRecipeModule } from './favorite-recipe/favorite-recipe.module';
import { SearchModule } from './search/search.module';
import { RecipeIngredient } from './entities/RecipeIngredient';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      entities : [User , Recipe , Utils , Comment , Image , Media , Ingredient ,Instruction ,Category ,FavoriteRecipe ,RecipeIngredient],
      username: 'root',
      password: '',
      database: 'recipe',
      synchronize: true,
    })
     , UserModule, AuthModule, CategoryModule, UtilsModule, ImageModule, MediaModule, RecipeModule, CommentModule, InstructionModule, IngredientModule, FavoriteRecipeModule, SearchModule]  ,
  controllers: [AppController ],
  providers: [AppService ],
})
export class AppModule {}
