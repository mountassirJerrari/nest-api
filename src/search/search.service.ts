import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Recipe } from '../entities/Recipe';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async searchRecipes(query?: string, category?: string, rating?: number, timeLimit?: number, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const take = limit;

    const queryBuilder = this.recipeRepository.createQueryBuilder('recipe');

    // Apply search query
    if (query) {
      queryBuilder.where('recipe.title LIKE :query', { query: `%${query}%` });
    }

    // Apply category filter
    if (category) {
      queryBuilder.innerJoin('recipe.category', 'category').andWhere('category.name = :category', { category });
    }

    // Apply rating filter
    if (rating) {
      queryBuilder.andWhere('recipe.rating >= :rating', { rating });
    }

    // Apply time limit filter
    if (timeLimit) {
      queryBuilder.andWhere('recipe.time <= :timeLimit', { timeLimit });
    }

    // Apply pagination
    queryBuilder.skip(skip).take(take);

    // Execute the query
    const recipes = await queryBuilder.getMany();

    return recipes;
  }
}
