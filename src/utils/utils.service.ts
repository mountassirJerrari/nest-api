import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utils } from '../entities/Utils';
import { CreateUtilsDto } from './dto/create-utils.dto';
import { UpdateUtilsDto } from './dto/update-utils.dto';

@Injectable()
export class UtilsService {
  constructor(
    @InjectRepository(Utils)
    private readonly utilsRepository: Repository<Utils>,
  ) {}

  async getAllUtils() {
    return this.utilsRepository.find();
  }

  async getUtilsById(id: number) {
    const utils = await this.utilsRepository.findOneBy({id});
    if (!utils) {
      throw new NotFoundException('Utils not found');
    }
    return utils;
  }

  async createUtils(createUtilsDto: CreateUtilsDto) {
    const newUtils = this.utilsRepository.create(createUtilsDto);
    return this.utilsRepository.save(newUtils);
  }

  async updateUtils(id: number, updateUtilsDto: UpdateUtilsDto) {
    const utils = await this.getUtilsById(id);
    this.utilsRepository.merge(utils, updateUtilsDto);
    return this.utilsRepository.save(utils);
  }

  async deleteUtils(id: number) {
    const utils = await this.getUtilsById(id);
    return this.utilsRepository.remove(utils);
  }
}
