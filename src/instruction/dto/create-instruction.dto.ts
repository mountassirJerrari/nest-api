import { IsNotEmpty } from 'class-validator';

export class CreateInstructionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  recipeId: number; // Assuming you have a recipeId field to associate with a recipe
}
