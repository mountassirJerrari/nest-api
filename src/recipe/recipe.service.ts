import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Recipe } from '../entities/Recipe';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Ingredient } from 'src/entities/Ingredient';
import { Category } from 'src/entities/Category';
import { Media } from 'src/entities/Media';
import { Image } from 'src/entities/Image';
import { Instruction } from 'src/entities/Instruction';
import { Comment } from 'src/entities/Comment';
import { FavoriteRecipe } from 'src/entities/FavoriteRecipe';
import { skip } from 'rxjs';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Instruction)
    private readonly instructionRepository: Repository<Instruction>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(FavoriteRecipe)
    private readonly favoriteRecipeRepository: Repository<FavoriteRecipe>,

  ) { }

  async getAllRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.find({ relations: ['category', 'media', 'media.images'] });
  }

  async getRecipeById(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.category', 'category')
      .leftJoinAndSelect('recipe.media', 'media')
      .leftJoinAndSelect('media.images', 'image')
      .where('recipe.id = :id', { id })
      .getOne();
  
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }

  async createRecipe(createRecipeDto: CreateRecipeDto) {
    const { categoryId, video, images, instructions, ...recipeData } = createRecipeDto;

    // Validate category existence
    const category = await this.categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Create media entity
    const newMedia = new Media();
    newMedia.video = video;
    // Save media entity
    const savedMedia = await this.mediaRepository.save(newMedia);

    // Create image entities
    const newImages = images.map(imageUrl => {
      const newImage = new Image();
      newImage.url = imageUrl;
      newImage.media = savedMedia;
      return newImage;
    });
    // Save image entities
    const savedImages = await this.imageRepository.save(newImages);

    // Create recipe entity
    const newRecipe = new Recipe();
    newRecipe.title = recipeData.title;
    newRecipe.rating = recipeData.rating;
    newRecipe.view = recipeData.view;
    newRecipe.time = recipeData.time;
    newRecipe.description = recipeData.description;
    newRecipe.category = category;
    newRecipe.media = savedMedia;

    // Save recipe entity
    const savedRecipe = await this.recipeRepository.save(newRecipe);



    if (instructions && instructions.length > 0) {
      const newInstructions = instructions.map(instructionDto => ({
        ...instructionDto,
        recipe: savedRecipe,
      }));
      await this.instructionRepository.save(newInstructions);
    }

    return savedRecipe;

  }


  async updateRecipe(id: number, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.getRecipeById(id);
    this.recipeRepository.merge(recipe, updateRecipeDto);
    return this.recipeRepository.save(recipe);
  }

  async deleteRecipe(id: number) {

    await this.commentRepository.delete({ recipe: { id } });
    await this.instructionRepository.delete({ recipe: { id } });


    const recipe = await this.getRecipeById(id);
    if (recipe.media) {
    
      await this.imageRepository.delete({ media: { id: recipe.media.id } });
      await this.mediaRepository.delete({ id: recipe.media.id });
    }

    await this.favoriteRecipeRepository.delete({ recipe : {id } } );


    return this.recipeRepository.remove(recipe);
  }

  async getRecipeComments(recipeId: number): Promise<Comment[]> {
    const recipe = await this.recipeRepository.findOneBy({ id: recipeId });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    const comments = await this.commentRepository.find({
      where: { recipe: { id: recipe.id } },
    });

    return comments;
  }


  async getRecipeIngredients(recipeId: number): Promise<Ingredient[]> {
    const recipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredient')
      .leftJoinAndSelect('recipeIngredient.ingredient', 'ingredient')
      .where('recipe.id = :id', { id: recipeId })
      .getOne();

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    return recipe.recipeIngredients.map(recipeIngredient => recipeIngredient.ingredient);
  }

  async getInstructionsByRecipeId(recipeId: number) {
    const options: FindManyOptions<Instruction> = {
      where: { recipe: { id: recipeId } },
      order: { order: 'ASC' },
    };

    return this.instructionRepository.find(options);
  }

  async getPaginatedRecipes(page: number, limit: number) {
    let skip : number ;
    skip = 0 ;
    if (page) {
      
       skip = (page - 1) * limit;
    }
    
    const [recipes, totalCount] = await this.recipeRepository.findAndCount({
      relations: ['category' , "media" , "media.images"],
      skip,
      take: limit,
    });
    return {
      recipes,
      totalCount,
    };
  }
}
