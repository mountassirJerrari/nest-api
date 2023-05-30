import { IsNotEmpty } from 'class-validator';

export class CreateIngredientDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  image: string;

  
}
