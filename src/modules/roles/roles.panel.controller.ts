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
import { Roles } from '../auth/decorators/roles.decorator';
import { FilterQueryDto } from '../../common/dto/filterQuery.dto';
import { prefix } from 'src/constants/prefix-panel.constant';
import { RolesService } from './roles.service';
import { Role, RoleDocument } from '../auth/schemas/role.schema';
import { UpdateRoleDto } from '../auth/dto/updateRole.dto';
import { CreateRoleDto } from '../auth/dto/createRole.dto';

@ApiBearerAuth()
@ApiTags(`${prefix}/roles`)
@UseGuards(AuthGuard('jwt'))
@UseGuards(RolesGuard)
@Controller(`${prefix}/roles`)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get('permissions')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('SUPER_ADMIN')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiOkResponse()
  async getAllPermissions() {
    return await this.rolesService.getAllPermissions();
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('SUPER_ADMIN')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse()
  async getAllRoles(@Query() filterQueryDto: FilterQueryDto): Promise<Role[]> {
    return await this.rolesService.getAllRoles(filterQueryDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('SUPER_ADMIN')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a role by id' })
  @ApiOkResponse()
  @ApiParam({ name: 'id', required: true })
  async getRoleById(@Param('id') code: number): Promise<RoleDocument> {
    return await this.rolesService.getRoleById(code);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('SUPER_ADMIN')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiOperation({ summary: 'Create role' })
  async createRole(@Body() creteRoleDto: CreateRoleDto): Promise<RoleDocument> {
    return await this.rolesService.createRole(creteRoleDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('SUPER_ADMIN')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Update role' })
  @ApiOkResponse()
  @ApiParam({ name: 'id', required: true })
  async updateRole(
    @Param('id') code: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleDocument> {
    return await this.rolesService.updateRole(code, updateRoleDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('SUPER_ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiOperation({ summary: 'Delete role' })
  @ApiParam({ name: 'id', required: true })
  async deleteRole(@Param('id') code: number): Promise<string> {
    return this.rolesService.deleteRole(code);
  }
}
