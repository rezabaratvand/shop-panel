import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../modules/users/schemas/user.schema';
import * as faker from 'faker';
import { Role, RoleDocument } from '../modules/auth/schemas/role.schema';
import permissions from '../constants/permissions.constant';
import { Product, ProductDocument } from 'src/modules/products/schemas/product.schema';
import {
  CategoryDocument,
  Category,
} from 'src/modules/categories/schemas/category.schema';
import { Brand, BrandDocument } from 'src/modules/brands/schemas/brand.schema';
import { Article, ArticleDocument } from 'src/modules/articles/schema/article.schema';
import { Banner, BannerDocument } from 'src/modules/banners/schemas/banner.schema';
import platformsConstant from 'src/constants/platforms.constant';
import { Order, OrderDocument } from 'src/modules/orders/schemas/order.schema';
@Injectable()
export class GenerateFakeDataService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(Banner.name) private bannerModel: Model<BannerDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async createNotVerifiedUser(
    data = {
      email: faker.internet.email(),
      password: faker.internet.password(8),
      verified: false,
    },
  ): Promise<UserDocument> {
    const user: UserDocument = new this.userModel(data);
    await user.save();
    return user;
  }

  async generateSingleRole(
    data = {
      name: faker.random.word(),
      permissions: [permissions.CREATE_USER, permissions.UPDATE_USER],
    },
  ): Promise<RoleDocument> {
    const role: RoleDocument = new this.roleModel(data);
    await role.save();
    return role;
  }

  async generateCategories(number: number = 10) {
    if ((await this.categoryModel.find({})).length <= 1)
      for (let i = 0; i < number; i++) {
        await this.generateSingleCategory();
      }
  }

  async generateBrands(number: number = 50) {
    if (!(await this.brandModel.find({})).length)
      for (let i = 0; i < number; i++) {
        await this.generateSingleBrand();
      }
  }

  async generateProducts(number: number = 100) {
    if (!(await this.productModel.find({})).length)
      for (let i = 0; i < number; i++) {
        await this.generateSingleProduct();
      }
  }
  async generateBanners(number: number = 50) {
    if (!(await this.bannerModel.find({})).length)
      for (let i = 0; i < number; i++) {
        await this.generateSingleBanner();
      }
  }

  async generateArticles(number: number = 100) {
    if (!(await this.articleModel.find({})).length)
      for (let i = 0; i < number; i++) {
        await this.generateSingleArticle();
      }
  }

  async generateUsers(number: number = 100) {
    if ((await this.userModel.find({})).length <= 1)
      for (let i = 0; i < number; i++) {
        await this.generateSingleUser();
      }
  }

  async generateFakeDocuments() {
    await this.generateCategories();
    await this.generateBrands();
    await this.generateProducts();
    await this.generateBanners();
    await this.generateArticles();
    await this.generateUsers();
  }

  // private methods
  private async generateSingleUser() {
    await this.userModel.create({
      email: faker.internet.email(),
      phoneNumber: '09123456789',
      password: faker.internet.password(8),
      isActive: true,
      verified: true,
      addresses: [
        {
          country: faker.address.country(),
          state: faker.address.state(),
          city: faker.address.city(),
          direction: faker.address.direction(),
          streetName: faker.address.streetName(),
          cardinalDirection: faker.address.cardinalDirection(),
          countryCode: faker.address.countryCode(),
          latitude: faker.address.latitude(),
        },
      ],
      fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      isStaff: false,
      avatar: faker.image.avatar(),
      credit: faker.random.number(1000),
      nationalCode: `${faker.random.number(20)}`,
    });
  }

  private async generateSingleProduct() {
    const category = await this.categoryModel.findOne({});
    const brand = await this.brandModel.findOne({});

    await this.productModel.create({
      title: faker.commerce.productName(),
      category: category._id,
      brand: brand._id,
      price: faker.commerce.price(1, 100000),
      pictures: [
        faker.image.business(1000, 1000),
        faker.image.business(1000, 1000),
        faker.image.business(1000, 1000),
      ],
      thumbnail: faker.image.business(50, 50),
      colors: [
        faker.lorem.word(5),
        faker.lorem.word(5),
        faker.lorem.word(5),
        faker.lorem.word(5),
      ],
      remainingNumber: faker.random.number(100),
      review: faker.lorem.text(),
      sizes: [faker.lorem.word(3), faker.lorem.word(3), faker.lorem.word(3)],
      maxDeliveryDays: faker.random.number(10),
      discount: faker.random.number(100),
      visits: faker.random.number(10000),
      forWholeCountry: faker.random.boolean(),
      specialOfferExpires: faker.date.future(),
      stars: faker.random.number(5),
      weight: faker.random.number(100000),
    });
  }

  private async generateSingleBrand() {
    await this.brandModel.create({
      name: faker.company.companyName(),
      thumbnail: faker.image.business(200, 200),
    });
  }

  private async generateSingleArticle() {
    const user = await this.userModel.findOne({});
    await this.articleModel.create({
      author: user._id,
      description: faker.random.words(5),
      body: faker.lorem.text(),
      title: faker.random.words(3),
      published: faker.random.boolean(),
      thumbnail: faker.image.abstract(200, 200),
      visits: faker.random.number(10000),
    });
  }

  private async generateSingleCategory() {
    const parent = await this.categoryModel.create({
      name: faker.name.jobArea(),
      properties: [
        faker.random.word(),
        faker.random.word(),
        faker.random.word(),
        faker.random.word(),
        faker.random.word(),
      ],
      picture: faker.image.abstract(1000, 1000),
      thumbnail: faker.image.abstract(200, 200),
    });
    await this.categoryModel.create({
      name: faker.name.jobArea(),
      properties: [
        faker.random.word(),
        faker.random.word(),
        faker.random.word(),
        faker.random.word(),
        faker.random.word(),
      ],
      picture: faker.image.abstract(1000, 1000),
      thumbnail: faker.image.abstract(200, 200),
      parent: parent._id,
    });
  }

  private async generateSingleBanner() {
    await this.bannerModel.create({
      name: faker.name.title(),
      platforms: [
        platformsConstant.WEBSITE,
        platformsConstant.ANDROID,
        platformsConstant.IOS,
      ],
      link: faker.internet.url(),
      status: faker.random.boolean(),
    });
  }
}
