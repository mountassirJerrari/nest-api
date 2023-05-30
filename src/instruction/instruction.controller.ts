import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InstructionService } from './instruction.service';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';

@Controller('instruction')
export class InstructionController {
  constructor(private readonly instructionService: InstructionService) {}

  @Get()
  getAllInstructions() {
    return this.instructionService.getAllInstructions();
  }

  @Get(':id')
  getInstructionById(@Param('id') id: number) {
    return this.instructionService.getInstructionById(id);
  }

  @Post()
  createInstruction(@Body() createInstructionDto: CreateInstructionDto) {
    return this.instructionService.createInstruction(createInstructionDto);
  }

  @Put(':id')
  updateInstruction(@Param('id') id: number, @Body() updateInstructionDto: UpdateInstructionDto) {
    return this.instructionService.updateInstruction(id, updateInstructionDto);
  }

  @Delete(':id')
  deleteInstruction(@Param('id') id: number) {
    return this.instructionService.deleteInstruction(id);
  }
}
