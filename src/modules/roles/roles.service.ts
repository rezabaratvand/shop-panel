import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterQueryDto } from 'src/common/dto/filterQuery.dto';
import { FilterQueries } from 'src/utils/filterQueries.util';
import { CreateRoleDto } from '../auth/dto/createRole.dto';
import { Role, RoleDocument } from '../auth/schemas/role.schema';
import mainPermissions from '../../constants/permissions.constant';
import { UpdateRoleDto } from '../auth/dto/updateRole.dto';
import permissionsConstant from '../../constants/permissions.constant';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>) {}
  // ROLES CRUD
  async getAllRoles(filterQueryDto: FilterQueryDto): Promise<Role[]> {
    const filterQuery = new FilterQueries(this.roleModel, filterQueryDto);

    filterQuery.filter().limitFields().paginate().sort();

    return await filterQuery.query;
  }

  async getRoleById(code: number): Promise<RoleDocument> {
    const role = await this.roleModel.findOne({ code });

    if (!role) throw new NotFoundException('the role not found');

    return role;
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<RoleDocument> {
    const { name, permissions } = createRoleDto;

    await this.checkRoleExistence(name);

    this.checkPermissions(permissions);

    return await this.roleModel.create(createRoleDto);
  }

  async updateRole(code: number, updateRoleDto: UpdateRoleDto): Promise<RoleDocument> {
    await this.getRoleById(code);

    if (updateRoleDto.name) await this.checkRoleExistence(updateRoleDto.name);

    if (updateRoleDto.permissions) this.checkPermissions(updateRoleDto.permissions);

    return await this.roleModel.findOneAndUpdate({ code }, updateRoleDto, {
      new: true,
    });
  }

  async deleteRole(code: number): Promise<string> {
    const role = await this.getRoleById(code);

    await role.deleteOne();

    return 'deleted successfully';
  }

  async getAllPermissions() {
    return Object.values(permissionsConstant);
  }

  // private methods
  private async checkRoleExistence(roleName: string) {
    const role = await this.roleModel.findOne({ name: roleName });
    if (role) throw new BadRequestException('This role name already exists');
  }

  private checkPermissions(permissions: Array<string>) {
    permissions.forEach((permission) => {
      if (!Object.values(mainPermissions).includes(permission))
        throw new BadRequestException('please enter valid permissions');
    });
  }
}
