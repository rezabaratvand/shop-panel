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
import { CreateUserDto } from './dto/createUserDto.dto';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUserDto';
import { RolesGuard } from '../auth/guards/roles.guard';
import permissions from '../../constants/permissions.constant';
import { Roles } from '../auth/decorators/roles.decorator';
import { FilterQueryDto } from '../../common/dto/filterQuery.dto';
import { prefix } from 'src/constants/prefix-panel.constant';

@ApiBearerAuth()
@ApiTags(`${prefix}/users`)
@UseGuards(AuthGuard('jwt'))
@UseGuards(RolesGuard)
@Controller(`${prefix}/users`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // admin routes
  @Get('admins')
  @Roles('SUPER_ADMIN')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all admins' })
  @ApiOkResponse()
  async getAllAdmins(@Query() filterQueryDto: FilterQueryDto): Promise<UserDocument[]> {
    return await this.usersService.getAllAdmins(filterQueryDto);
  }

  @Get('admins:id')
  @Roles('SUPER_ADMIN')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiOperation({ summary: 'Get a admin user by id' })
  @ApiParam({ name: 'id', required: true })
  async getAdminById(@Param('id') code: number): Promise<UserDocument> {
    return await this.usersService.getAdminById(code);
  }

  @Patch('admins:id')
  @Roles('SUPER_ADMIN')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Update admin user' })
  @ApiOkResponse()
  @ApiParam({ name: 'id', required: true })
  async updateAdmin(
    @Param('id') code: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.usersService.updateAdmin(code, updateUserDto);
  }

  @Delete('admins/:id')
  @Roles('SUPER_ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete admin user' })
  @ApiNoContentResponse()
  @ApiParam({ name: 'id', required: true })
  async deleteAdmin(@Param('id') code: number): Promise<void> {
    return this.usersService.deleteAdmin(code);
  }
  // users routes
  @Get()
  @Roles(permissions.READ_USER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse()
  async getAllUsers(@Query() filterQueryDto: FilterQueryDto): Promise<UserDocument[]> {
    return await this.usersService.getAllUsers(filterQueryDto);
  }

  @Get(':id')
  @Roles(permissions.READ_USER)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiParam({ name: 'id', required: true })
  async getUserById(@Param('id') code: number): Promise<UserDocument> {
    return await this.usersService.getUserById(code);
  }

  @Post()
  @Roles(permissions.CREATE_USER)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiOperation({ summary: 'Create user' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return await this.usersService.createUser(createUserDto);
  }

  @Patch('/:id')
  @Roles(permissions.UPDATE_USER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse()
  @ApiParam({ name: 'id', required: true })
  async updateUser(
    @Param('id') code: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.usersService.updateUser(code, updateUserDto);
  }

  @Delete('/:id')
  @Roles(permissions.DELETE_USER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiNoContentResponse()
  @ApiParam({ name: 'id', required: true })
  async deleteUser(@Param('id') code: number): Promise<void> {
    return this.usersService.deleteUser(code);
  }
}
