import { IsInt } from 'class-validator';

export class UpdateFavoriteRecipeDto {
  

  @IsInt()
  recipeId: number;
}
