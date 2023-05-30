import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'src/entities/Recipe';
import { Category } from 'src/entities/Category';

@Module({
  imports : [TypeOrmModule.forFeature([Recipe,Category])],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
