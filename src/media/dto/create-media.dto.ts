import { IsNotEmpty } from 'class-validator';

export class CreateMediaDto {
  @IsNotEmpty()
  video: string;
}
