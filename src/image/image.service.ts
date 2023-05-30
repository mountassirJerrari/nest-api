import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entities/Image';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async getAllImages() {
    return this.imageRepository.find();
  }

  async getImageById(id: number) {
    const image = await this.imageRepository.findOneBy({id});
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    return image;
  }

  async createImage(createImageDto: CreateImageDto) {
    const newImage = this.imageRepository.create(createImageDto);
    return this.imageRepository.save(newImage);
  }

  async updateImage(id: number, updateImageDto: UpdateImageDto) {
    const image = await this.getImageById(id);
    this.imageRepository.merge(image, updateImageDto);
    return this.imageRepository.save(image);
  }

  async deleteImage(id: number) {
    const image = await this.getImageById(id);
    return this.imageRepository.remove(image);
  }
}
