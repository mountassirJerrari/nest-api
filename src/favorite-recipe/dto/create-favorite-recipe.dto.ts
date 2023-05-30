import { IsInt } from 'class-validator';

export class CreateFavoriteRecipeDto {
 

  @IsInt()
  recipeId: number;
}
