import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  getAllImages() {
    return this.imageService.getAllImages();
  }

  @Get(':id')
  getImageById(@Param('id') id: number) {
    return this.imageService.getImageById(id);
  }

  @Post()
  createImage(@Body() createImageDto: CreateImageDto) {
    return this.imageService.createImage(createImageDto);
  }

  @Put(':id')
  updateImage(@Param('id') id: number, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.updateImage(id, updateImageDto);
  }

  @Delete(':id')
  deleteImage(@Param('id') id: number) {
    return this.imageService.deleteImage(id);
  }
}
