import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { Category } from 'src/entities/Category';
import { Recipe } from 'src/entities/Recipe';
import { User } from 'src/entities/User';
import { RecipeModule } from 'src/recipe/recipe.module';
import { UserService } from './services/user/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User , Recipe , Category]) , forwardRef(() => RecipeModule) ,forwardRef(() => AuthModule)],
  providers: [UserService , AuthGuard],
  controllers: [UserController],
  exports : [ UserService]
})
export class UserModule {}
