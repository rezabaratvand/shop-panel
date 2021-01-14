import { Controller, Get, Param, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryDocument } from './schemas/category.schema';

import { FilterQueryDto } from '../../common/dto/filterQuery.dto';
@ApiTags('categories')
@Controller('categories')
export class CategoriesShopController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse()
  async getAll(@Query() filterQueryDto: FilterQueryDto): Promise<CategoryDocument[]> {
    return await this.categoriesService.getAll(filterQueryDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a category by id' })
  @ApiOkResponse()
  async getById(@Param('id') code: number): Promise<CategoryDocument> {
    return await this.categoriesService.getById(code);
  }
}
