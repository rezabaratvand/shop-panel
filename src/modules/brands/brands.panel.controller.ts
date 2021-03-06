import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import permissions from '../../constants/permissions.constant';
import { Roles } from '../auth/decorators/roles.decorator';
import { FilterQueryDto } from '../../common/dto/filterQuery.dto';
import { BrandsService } from './brands.service';
import { BrandDocument } from './schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { prefix } from 'src/constants/prefix-panel.constant';

@ApiBearerAuth()
@ApiTags(`${prefix}/brands`)
@UseGuards(AuthGuard('jwt'))
@UseGuards(RolesGuard)
@Controller(`${prefix}/brands`)
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all brands' })
  @ApiOkResponse()
  async getAll(@Query() filterQueryDto: FilterQueryDto): Promise<BrandDocument[]> {
    return await this.brandService.getAll(filterQueryDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiOperation({ summary: 'Get a brand by id' })
  @ApiParam({ name: 'id', required: true })
  async getById(@Param('id') code: number): Promise<BrandDocument> {
    return await this.brandService.getById(code);
  }

  @Post()
  @Roles(permissions.CREATE_BRAND)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiOperation({ summary: 'Create brand' })
  async create(@Body() createBrandDto: CreateBrandDto): Promise<BrandDocument> {
    return await this.brandService.create(createBrandDto);
  }

  @Patch(':id')
  @Roles(permissions.UPDATE_BRAND)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Update brand' })
  @ApiOkResponse()
  @ApiParam({ name: 'id', required: true })
  async update(
    @Param('id') code: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<BrandDocument> {
    return await this.brandService.update(code, updateBrandDto);
  }

  @Delete(':id')
  @Roles(permissions.DELETE_BRAND)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete brand' })
  @ApiNoContentResponse()
  @ApiParam({ name: 'id', required: true })
  async delete(@Param('id') code: number): Promise<void> {
    return this.brandService.delete(code);
  }
}
