import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  getAllIngredients() {
    return this.ingredientService.getAllIngredients();
  }

  @Get(':id')
  getIngredientById(@Param('id') id: number) {
    return this.ingredientService.getIngredientById(id);
  }

  @Post()
  createIngredient(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.createIngredient(createIngredientDto);
  }

  @Put(':id')
  updateIngredient(@Param('id') id: number, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientService.updateIngredient(id, updateIngredientDto);
  }

  @Delete(':id')
  deleteIngredient(@Param('id') id: number) {
    return this.ingredientService.deleteIngredient(id);
  }

  
}
