import { Controller, Get, Query, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchRecipes(
    @Query('query') query?: string,
    @Query('category') category?: string,
    @Query('rating') rating?: string,
    @Query('timeLimit') timeLimit?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    let numericRating: number | undefined;
    let numericTimeLimit: number | undefined;
  
    if (rating) {
      numericRating = parseInt(rating, 10);
      if (isNaN(numericRating)) {
        throw new BadRequestException('Invalid rating value');
      }
    }
  
    if (timeLimit) {
      numericTimeLimit = parseInt(timeLimit, 10);
      if (isNaN(numericTimeLimit)) {
        throw new BadRequestException('Invalid time limit value');
      }
    }

    
  
    const recipes = await this.searchService.searchRecipes(query, category, numericRating, numericTimeLimit, page, limit);
    return recipes;
  }
  
}
