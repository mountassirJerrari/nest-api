import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  mediaId: number;
}
