import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../categories/schemas/category.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductsController } from './products.panel.controller';
import { ProductsService } from './products.service';
import { Brand, BrandSchema } from '../brands/schemas/brand.schema';
import { ShopProductsController } from './products.shop.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;
          return schema;
        },
      },
      {
        name: Category.name,
        useFactory: () => {
          const schema = CategorySchema;
          return schema;
        },
      },
      {
        name: Brand.name,
        useFactory: () => {
          const schema = BrandSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [ProductsController, ShopProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
