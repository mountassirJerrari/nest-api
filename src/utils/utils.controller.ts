import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { CreateUtilsDto } from './dto/create-utils.dto';
import { UpdateUtilsDto } from './dto/update-utils.dto';

@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Get()
  getAllUtils() {
    return this.utilsService.getAllUtils();
  }

  @Get(':id')
  getUtilsById(@Param('id') id: number) {
    return this.utilsService.getUtilsById(id);
  }

  @Post()
  createUtils(@Body() createUtilsDto: CreateUtilsDto) {
    return this.utilsService.createUtils(createUtilsDto);
  }

  @Put(':id')
  updateUtils(@Param('id') id: number, @Body() updateUtilsDto: UpdateUtilsDto) {
    return this.utilsService.updateUtils(id, updateUtilsDto);
  }

  @Delete(':id')
  deleteUtils(@Param('id') id: number) {
    return this.utilsService.deleteUtils(id);
  }
}
