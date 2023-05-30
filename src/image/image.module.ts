import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { Image } from 'src/entities/Image';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Image])] ,
  controllers: [ImageController],
  providers: [ImageService]
})
export class ImageModule {}
