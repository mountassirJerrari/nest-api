import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsArray, ArrayNotEmpty, ArrayMinSize, ValidateNested } from 'class-validator';


class CreateIngredientDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  image: string;
}

class CreateInstructionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  order: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNumber()
  rating: number;

  @IsNumber()
  view: number;

  @IsNotEmpty()
  time: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  @IsString()
  video: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  images: string[];

  

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInstructionDto)
  instructions: CreateInstructionDto[];
}
