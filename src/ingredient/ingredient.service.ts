import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../entities/Ingredient';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Recipe } from 'src/entities/Recipe';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>
  ) {}

  async getAllIngredients() {
    return this.ingredientRepository.find();
  }

  async getIngredientById(id: number) {
    const ingredient = await this.ingredientRepository.findOneBy({id});
    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }
    return ingredient;
  }

  async createIngredient(createIngredientDto: CreateIngredientDto) {
    const {  title, description, image } = createIngredientDto;
  
    
    const newIngredient = this.ingredientRepository.create({
      title,
      description,
      image,
    });
    return this.ingredientRepository.save(newIngredient);
  }
  

  async updateIngredient(id: number, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.getIngredientById(id);
    this.ingredientRepository.merge(ingredient, updateIngredientDto);
    return this.ingredientRepository.save(ingredient);
  }

  async deleteIngredient(id: number) {
    const ingredient = await this.getIngredientById(id);
    return this.ingredientRepository.remove(ingredient);
  }
  async getIngredientRecipes(
    ingredientId: number,
    page: number,
    limit: number,
  ): Promise<Recipe[]> {
    const skip = (page - 1) * limit;
    const take = limit;

    const ingredient = await this.ingredientRepository
    .createQueryBuilder('ingredient')
    .leftJoin('ingredient.recipeIngredients', 'recipeIngredient')
    .leftJoin('recipeIngredient.recipe', 'recipe')
    .where('ingredient.id = :id', { id: ingredientId })
    .skip(skip)
    .take(take)
    .getOne();

  if (!ingredient) {
    throw new NotFoundException('Ingredient not found');
  }

  return ingredient.recipeIngredients.map(
    (recipeIngredient) => recipeIngredient.recipe,
  );
}
}
