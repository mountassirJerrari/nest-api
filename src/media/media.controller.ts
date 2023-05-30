import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  getAllMedia() {
    return this.mediaService.getAllMedia();
  }

  @Get(':id')
  getMediaById(@Param('id') id: number) {
    return this.mediaService.getMediaById(id);
  }

  @Post()
  createMedia(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.createMedia(createMediaDto);
  }

  @Put(':id')
  updateMedia(@Param('id') id: number, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.updateMedia(id, updateMediaDto);
  }

  @Delete(':id')
  deleteMedia(@Param('id') id: number) {
    return this.mediaService.deleteMedia(id);
  }
}
