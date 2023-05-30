import { Module } from '@nestjs/common';
import { InstructionController } from './instruction.controller';
import { InstructionService } from './instruction.service';
import { Instruction } from 'src/entities/Instruction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'src/entities/Recipe';

@Module({
  imports: [TypeOrmModule.forFeature([Instruction , Recipe])],

  controllers: [InstructionController],
  providers: [InstructionService]
})
export class InstructionModule { }
