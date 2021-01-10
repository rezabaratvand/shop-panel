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
import { QuestionDocument, Question } from 'src/modules/qs-as/schemas/question.schema';
import { Answer, AnswerDocument } from 'src/modules/qs-as/schemas/answer.schema';
import { Payment, PaymentDocument } from 'src/modules/payments/schemas/payment.schema';
import paymentStatusesConstant from 'src/constants/payment-statuses.constant';
import paymentMethodsConstant from 'src/constants/payment-methods.constant';
import orderStatuesConstant from 'src/constants/order-statues.constant';
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
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async generateFakeDocuments() {
    await this.generateCategories();
    await this.generateBrands();
    await this.generateProducts();
    await this.generateUsers();
    await this.generateArticles();
    await this.generateQAs();
    await this.generatePayments();
    await this.generateOrders();
    await this.generateBanners();
    await this.generateRoles();
  }

  // ************************** private methods **************************

  // ****** multiple-instance generator methods *******

  private async generateRoles(number: number = 100) {
    if (!(await this.roleModel.find({})).length)
      for (let i = 0; i < number; i++) {
        await this.generateSingleRole();
      }
  }

  private async generateCategories(number: number = 5) {
    if ((await this.categoryModel.find({})).length <= 1)
      for (let i = 0; i < number; i++) {
        await this.generateSingleCategory();
      }
  }

  private async generateBrands(number: number = 100) {
    if (!(await this.brandModel.find({})).length)
      for (let i = 0; i < number; i++) {
        await this.generateSingleBrand();
      }
  }

  private async generateProducts(number: number = 100) {
    if (!(await this.productModel.find({})).length)
      for (let i = 0; i < number; i++) {
        await this.generateSingleProduct();
      }
  }
  private async generateBanners(number: number = 50) {
    if (!(await this.bannerModel.find({})).length)
      for (let i = 0; i < number; i++) {
        await this.generateSingleBanner();
      }
  }

  private async generateArticles(number: number = 100) {
    if (!(await this.articleModel.find({})).length)
      for (let i = 0; i < number; i++) {
        await this.generateSingleArticle();
      }
  }

  private async generateUsers(number: number = 100) {
    if ((await this.userModel.find({})).length <= 1)
      for (let i = 0; i < number; i++) {
        await this.generateSingleUser();
      }
  }
  private async generateQAs(number: number = 50) {
    if (
      !(await this.questionModel.find({})).length &&
      !(await this.answerModel.find({})).length
    )
      for (let i = 0; i < number; i++) {
        await this.generateSingleQA();
      }
  }

  private async generatePayments(number: number = 100) {
    if (!(await this.paymentModel.find({})).length)
      for (let i = 0; i < number; i++) {
        await this.generateSinglePayment();
      }
  }

  private async generateOrders(number: number = 100) {
    if (!(await this.orderModel.find({})).length)
      for (let i = 0; i < number; i++) {
        await this.generateSingleOrder();
      }
  }

  // ****** single-instance generator methods *******

  private async generateSingleRole() {
    const permissionArray = Object.values(permissions);

    await this.roleModel.create({
      name: faker.name.title(),
      permissions: faker.random.arrayElements(
        permissionArray,
        faker.random.number(5) + 1,
      ),
    });
  }

  private async generateSingleUser() {
    const randomProductCode1 = faker.random.number(99) + 1;
    const randomProductCode2 = faker.random.number(99) + 1;
    const randomProductCode3 = faker.random.number(99) + 1;
    const randomProductCode4 = faker.random.number(99) + 1;
    const randomProductCode5 = faker.random.number(99) + 1;

    const product1 = await this.productModel.findOne({ code: randomProductCode1 });
    const product2 = await this.productModel.findOne({ code: randomProductCode2 });
    const product3 = await this.productModel.findOne({ code: randomProductCode3 });
    const product4 = await this.productModel.findOne({ code: randomProductCode4 });
    const product5 = await this.productModel.findOne({ code: randomProductCode5 });

    await this.userModel.create({
      email: faker.internet.email(),
      phoneNumber: '09123456789',
      password: faker.internet.password(8),
      isActive: true,
      verified: true,
      wishLists: [product1, product2, product3, product4, product5],
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
      avatar: faker.image.people(200, 200),
      credit: faker.finance.creditCardCVV(),
      nationalCode: `${faker.random.number(20) + 1}`,
    });
  }

  private async generateSingleProduct() {
    const randomNumber = faker.random.number(99) + 1;

    const category = await this.categoryModel.findOne({ code: randomNumber });
    const brand = await this.brandModel.findOne({ code: randomNumber });

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
      remainingNumber: faker.random.number(100) + 1,
      review: faker.lorem.text(),
      sizes: [faker.lorem.word(3), faker.lorem.word(3), faker.lorem.word(3)],
      maxDeliveryDays: faker.random.number(10) + 1,
      discount: faker.random.number(100) + 1,
      visits: faker.random.number(10000) + 1,
      forWholeCountry: faker.random.boolean(),
      specialOfferExpires: faker.date.future(),
      stars: faker.random.number(4) + 1,
      weight: faker.random.number(100000) + 1,
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
    for (let i = 0; i < 2; i++) {
      const child1 = await this.categoryModel.create({
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

      for (let i = 0; i < 2; i++) {
        const child2 = await this.categoryModel.create({
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
          parent: child1._id,
        });

        for (let i = 0; i < 2; i++) {
          const child3 = await this.categoryModel.create({
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
            parent: child2._id,
          });

          for (let i = 0; i < 2; i++) {
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
              parent: child3._id,
            });
          }
        }
      }
    }
  }

  private async generateSingleBanner() {
    const platforms = Object.values(platformsConstant);

    await this.bannerModel.create({
      name: faker.name.title(),
      platforms: faker.random.arrayElements(platforms, faker.random.number(2) + 1),
      link: faker.internet.url(),
      status: faker.random.boolean(),
      thumbnail: faker.image.abstract(240, 60),
      picture: faker.image.abstract(1200, 300),
    });
  }

  private async generateSingleQA() {
    const randomNumber = faker.random.number(99) + 1;

    const user = await this.userModel.findOne({ code: randomNumber });
    const product = await this.productModel.findOne({ code: randomNumber });

    const question = await this.questionModel.create({
      user: user._id,
      body: faker.lorem.text(),
      product: product._id,
      published: faker.random.boolean(),
    });

    for (let i = 0; i < 5; i++) {
      await this.answerModel.create({
        question: question._id,
        user: user._id,
        body: faker.lorem.text(),
        published: faker.random.boolean(),
      });
    }
  }

  private async generateSinglePayment() {
    const randomNumber = faker.random.number(99) + 1;
    const user = await this.userModel.findOne({ code: randomNumber });

    await this.paymentModel.create({
      user: user._id,
      amount: faker.random.number(1000000) + 1,
      status: faker.random.objectElement(paymentStatusesConstant),
      method: faker.random.objectElement(paymentMethodsConstant),
      paymentInformation: {
        account: `${faker.finance.account()}`,
        bic: faker.finance.bic(),
        bank: faker.random.word(),
        emv: faker.random.word(),
      },
    });
  }
  private async generateSingleOrder() {
    const randomNumber = faker.random.number(99) + 1;
    const randomProductCode1 = faker.random.number(99) + 1;
    const randomProductCode2 = faker.random.number(99) + 1;
    const randomProductCode3 = faker.random.number(99) + 1;

    const product1 = await this.productModel.findOne({ code: randomProductCode1 });
    const product2 = await this.productModel.findOne({ code: randomProductCode2 });
    const product3 = await this.productModel.findOne({ code: randomProductCode3 });

    const payment = await this.paymentModel.findOne({ code: randomNumber });
    const user = await this.userModel.findOne({ code: randomNumber });

    await this.orderModel.create({
      user: user._id,
      payment: payment._id,
      products: [product1._id, product2._id, product3._id],
      status: faker.random.objectElement(orderStatuesConstant),
    });
  }
}
