import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../modules/categories/schemas/category.schema';
import {
  WebsiteInformation,
  WebsiteInformationSchema,
} from '../modules/website-information/schemas/website-information.schema';

import { Role, RoleSchema } from '../modules/auth/schemas/role.schema';
import { User, UserSchema } from '../modules/users/schemas/user.schema';
import { GenerateFakeDataService } from './generate-fake-data.service';
import { GenerateInitialDataService } from './generate-initial-data.service';
import { Product, ProductSchema } from 'src/modules/products/schemas/product.schema';
import { Brand, BrandSchema } from 'src/modules/brands/schemas/brand.schema';
import { Article, ArticleSchema } from 'src/modules/articles/schema/article.schema';
import { Banner, BannerSchema } from 'src/modules/banners/schemas/banner.schema';
import { Order, OrderSchema } from 'src/modules/orders/schemas/order.schema';
import { QuestionSchema, Question } from 'src/modules/qs-as/schemas/question.schema';
import { Answer, AnswerSchema } from 'src/modules/qs-as/schemas/answer.schema';
import { Payment, PaymentSchema } from 'src/modules/payments/schemas/payment.schema';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          return schema;
        },
      },
      {
        name: WebsiteInformation.name,
        useFactory: () => {
          const schema = WebsiteInformationSchema;
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
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;
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
      {
        name: Article.name,
        useFactory: () => {
          const schema = ArticleSchema;
          return schema;
        },
      },
      {
        name: Banner.name,
        useFactory: () => {
          const schema = BannerSchema;
          return schema;
        },
      },
      {
        name: Role.name,
        useFactory: () => {
          const schema = RoleSchema;
          return schema;
        },
      },
      {
        name: Order.name,
        useFactory: () => {
          const schema = OrderSchema;
          return schema;
        },
      },
      {
        name: Question.name,
        useFactory: () => {
          const schema = QuestionSchema;
          return schema;
        },
      },
      {
        name: Answer.name,
        useFactory: () => {
          const schema = AnswerSchema;
          return schema;
        },
      },
      {
        name: Payment.name,
        useFactory: () => {
          const schema = PaymentSchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [GenerateFakeDataService, GenerateInitialDataService],
  exports: [GenerateFakeDataService, GenerateInitialDataService],
})
export class GenerateDataModule {}
