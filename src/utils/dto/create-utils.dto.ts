import { IsNotEmpty } from 'class-validator';

export class CreateUtilsDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: string;

  // Add more fields as needed
}
