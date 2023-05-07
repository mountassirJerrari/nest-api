import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from 'src/entities/Category';
import { Recipe } from 'src/entities/Recipe';
import { User } from 'src/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';
@Module({
  controllers: [CategoryController],
  providers: [CategoryService , AuthGuard] , 
  imports:[TypeOrmModule.forFeature([User , Recipe , Category]) , AuthModule]
})
export class CategoryModule {}
