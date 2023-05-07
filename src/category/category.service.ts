import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/Category';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category)
  private categoryRepo: Repository<Category>){

  }
  
  async create(data: CreateCategoryDto) {
    let category :Category =  this.categoryRepo.create({...data})
    
    return await this.categoryRepo.save(category);
  }

  async findAll() {
    return await this.categoryRepo.find();
  }

  async findOne(id: number) {
    return await this.categoryRepo.findOneBy({id});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    let category :Category =await  this.categoryRepo.findOneBy({id})
    if (!category) {
      throw new HttpException(`Category with id ${id} not found` , HttpStatus.BAD_REQUEST);
    }
    category = { ...category ,id , ...updateCategoryDto }
    return await this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOneBy({id});
    if (!category) {
      throw new HttpException(`Category with id ${id} not found` , HttpStatus.BAD_REQUEST);
    }
    return await this.categoryRepo.delete(id);
  }
}
