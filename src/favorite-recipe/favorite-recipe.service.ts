import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteRecipe } from '../entities/FavoriteRecipe';
import { CreateFavoriteRecipeDto } from './dto/create-favorite-recipe.dto';

@Injectable()
export class FavoriteRecipeService {
  constructor(
    @InjectRepository(FavoriteRecipe)
    private readonly favoriteRecipeRepository: Repository<FavoriteRecipe>,
  ) {}

  async findAllByUser(userId: number): Promise<FavoriteRecipe[]> {
    return this.favoriteRecipeRepository.find({ where: { user: {id :userId} } });
  }

  async create(createFavoriteRecipeDto: CreateFavoriteRecipeDto, userId: number): Promise<FavoriteRecipe> {
    const favoriteRecipe = this.favoriteRecipeRepository.create({
      recipe : {id :createFavoriteRecipeDto.recipeId } ,
      user : {id :userId  }
    });
    return this.favoriteRecipeRepository.save(favoriteRecipe);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.favoriteRecipeRepository.delete({ id, user: {id:userId} });
  }
}
