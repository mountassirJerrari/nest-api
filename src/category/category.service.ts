import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/Category';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Recipe } from 'src/entities/Recipe';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async getAllCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.find();
    return categories.map(category => ({
      id: category.id,
      name: category.name,
      image : category.image
    }));
  }

  async getCategoryById(id: number): Promise<CategoryDto> {
    const category = await this.categoryRepository.findOneBy({id});
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return {
      id: category.id,
      name: category.name,
      image : category.image
    };
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(category);
    return {
      id: category.id,
      name: category.name,
      image : category.image
    };
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto> {
    const category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.categoryRepository.save(category);
    return {
      id: category.id,
      name: category.name,
      image : category.image
    };
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({id});
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.categoryRepository.remove(category);
  }
  async getRecipesByCategoryId(categoryId: number): Promise<Recipe[]> {
    return this.recipeRepository.find({
      where: { category: { id: categoryId }, },relations:['category','media','media.images']
      
    });
  }
}
