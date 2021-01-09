import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from '../auth/schemas/role.schema';
import { RolesController } from './roles.panel.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Role.name,
        useFactory: () => {
          const schema = RoleSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
