import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.panel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { AuthModule } from '../auth/auth.module';
import { CategoriesShopController } from './categories.shop.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        useFactory: () => {
          const schema = CategorySchema;
          return schema;
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [CategoriesController, CategoriesShopController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
