import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/Category';
import { Recipe } from 'src/entities/Recipe';

@Module({
  imports:[TypeOrmModule.forFeature([Category , Recipe])],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
