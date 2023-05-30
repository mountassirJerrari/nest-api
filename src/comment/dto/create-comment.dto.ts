import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  recipeId: number; // Assuming you have a recipeId field to associate with a recipe


  userId: number; // Assuming you have a userId field to associate with a user
}
