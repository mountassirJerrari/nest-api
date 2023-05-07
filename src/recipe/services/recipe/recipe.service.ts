import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/entities/Recipe';
import { User } from 'src/entities/User';
import { CreateRecipeDto } from 'src/dtos/CreateRecipeDto';
import { QueryFailedError, Repository } from 'typeorm';
import { Category } from 'src/entities/Category';

@Injectable()
export class RecipeService {

    constructor(@InjectRepository(Recipe)
    private recipeRepo: Repository<Recipe>, @InjectRepository(User)
        private userRepo: Repository<User> ,@InjectRepository(Category)
        private categoryRepo: Repository<Category>) {

    }
    findAll(): Promise<Recipe[]> {
        return this.recipeRepo.find();
    }
    async findAllByUserId(userId: number): Promise<Recipe[]> {
        return await this.recipeRepo.find({
            where: {
                user: {
                    id: userId
                }
            }
        });
    }

    findOne(id: number): Promise<Recipe | null> {
        return this.recipeRepo.findOneBy({ id });
    }

    async remove(id: number): Promise<Recipe> {
        let recipe: Recipe = await this.findOne(id);
        await this.recipeRepo.delete(id);
        return recipe;

    }

    async create(userId: number , data: CreateRecipeDto) {
        let user: User = await this.userRepo.findOneBy({ id: userId })
        let {categoryId , ...recipeData} = data ;
        let category: Category = await this.categoryRepo.findOneBy({ id: categoryId })

        if (!category) {
            throw new HttpException("invalid category Id" , HttpStatus.BAD_REQUEST);
            
        }
        let recipe: any = this.recipeRepo.create({ ...recipeData, user , category })

        try {
            
            return await this.recipeRepo.save(recipe);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new HttpException('recipe already exist', HttpStatus.BAD_REQUEST);
            }
        }
    }
}
