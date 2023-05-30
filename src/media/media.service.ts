import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from '../entities/Media';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async getAllMedia() {
    return this.mediaRepository.find();
  }

  async getMediaById(id: number) {
    const media = await this.mediaRepository.findOneBy({id});
    if (!media) {
      throw new NotFoundException('Media not found');
    }
    return media;
  }

  async createMedia(createMediaDto: CreateMediaDto) {
    const newMedia = this.mediaRepository.create(createMediaDto);
    return this.mediaRepository.save(newMedia);
  }

  async updateMedia(id: number, updateMediaDto: UpdateMediaDto) {
    const media = await this.getMediaById(id);
    this.mediaRepository.merge(media, updateMediaDto);
    return this.mediaRepository.save(media);
  }

  async deleteMedia(id: number) {
    const media = await this.getMediaById(id);
    return this.mediaRepository.remove(media);
  }
}
