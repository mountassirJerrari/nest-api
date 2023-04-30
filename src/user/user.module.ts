import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/Category';
import { Recipe } from 'src/entities/Recipe';
import { User } from 'src/entities/User';
import { UserService } from './services/user/user.service';
import { UserController } from './user.controller';
import { RecipeService } from './services/recipe/recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([User , Recipe , Category])],
  providers: [UserService, RecipeService],
  controllers: [UserController],
  exports : [ UserService]
})
export class UserModule {}
