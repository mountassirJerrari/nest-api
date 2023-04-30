import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/entities/Recipe';
import { User } from 'src/entities/User';
import { CreateRecipeDto } from 'src/user/dtos/CreateRecipeDto';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class RecipeService {

    constructor(@InjectRepository(Recipe)
    private recipeRepo: Repository<Recipe>, @InjectRepository(User)
        private userRepo: Repository<User>) {

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

    async create(userId: number, data: CreateRecipeDto) {
        let user: User = await this.userRepo.findOneBy({ id: userId })

        let recipe: Recipe = this.recipeRepo.create({ ...data, user })

        try {
            return await this.recipeRepo.save(recipe);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new HttpException('reciep already exist', HttpStatus.BAD_REQUEST);
            }
        }
    }
}
