import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instruction } from '../entities/Instruction';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';
import { Recipe } from 'src/entities/Recipe';

@Injectable()
export class InstructionService {
  constructor(
    @InjectRepository(Instruction)
    private readonly instructionRepository: Repository<Instruction>,
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async getAllInstructions() {
    return this.instructionRepository.find();
  }

  async getInstructionById(id: number) {
    const instruction = await this.instructionRepository.findOneBy({id});
    if (!instruction) {
      throw new NotFoundException('Instruction not found');
    }
    return instruction;
  }

  async createInstruction(createInstructionDto: CreateInstructionDto) {
    const { recipeId, title, description } = createInstructionDto;
  
    const recipe = await this.recipeRepository.findOneBy({id :recipeId});
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
  
    const newInstruction = this.instructionRepository.create({
      title,
      description,
      recipe,
    });
  
    return this.instructionRepository.save(newInstruction);
  }

  async updateInstruction(id: number, updateInstructionDto: UpdateInstructionDto) {
    const instruction = await this.getInstructionById(id);
    this.instructionRepository.merge(instruction, updateInstructionDto);
    return this.instructionRepository.save(instruction);
  }

  async deleteInstruction(id: number) {
    const instruction = await this.getInstructionById(id);
    return this.instructionRepository.remove(instruction);
  }
}
