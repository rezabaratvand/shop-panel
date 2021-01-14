import { Controller, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';

import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { FilterQueryDto } from '../../common/dto/filterQuery.dto';
import { ProductDocument } from './schemas/product.schema';

@ApiTags('products')
@Controller('products')
export class ShopProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse()
  async getAll(@Query() filterQueryDto: FilterQueryDto): Promise<ProductDocument[]> {
    return await this.productService.getAll(filterQueryDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiParam({ name: 'id', required: true })
  async getById(@Param('id') code: number): Promise<ProductDocument> {
    return await this.productService.getById(code);
  }
}
