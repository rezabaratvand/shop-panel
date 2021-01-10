import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  WebsiteInformation,
  WebsiteInformationDocument,
} from '../modules/website-information/schemas/website-information.schema';
import { User, UserDocument } from '../modules/users/schemas/user.schema';
import * as faker from 'faker';
import {
  Category,
  CategoryDocument,
} from '../modules/categories/schemas/category.schema';
import { GenerateFakeDataService } from './generate-fake-data.service';

@Injectable()
export class GenerateInitialDataService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(WebsiteInformation.name)
    private readonly websiteInfoModel: Model<WebsiteInformationDocument>,
    private readonly generateFakeDataService: GenerateFakeDataService,
  ) {}

  async onModuleInit() {
    await this.createSuperUserModel();
    await this.InitialWebsiteInfo();
    await this.generateFakeDataService.generateFakeDocuments();
  }

  async createSuperUserModel() {
    const data: any = {
      email: 'superadmin@mail.me',
      password: '12345678',
      isSuperAdmin: true,
      verified: true,
      isActive: true,
      isStaff: true,
      code: 1,
    };

    const superAdmin = await this.userModel.findOne({ email: data.email });

    if (superAdmin) {
      superAdmin.password = data.password;
      await superAdmin.save();
    } else if (!superAdmin) {
      await this.userModel.create(data);
      Logger.verbose(
        'super user created. <!! change email and password as soon as you can !!>',
      );
    }
  }

  async InitialWebsiteInfo() {
    const websiteInfo = await this.websiteInfoModel.find();
    if (websiteInfo.length) return websiteInfo;

    const data: any = {
      name: faker.name.title(),
      picture: 'picture',
      properties: ['color'],
      thumbnail: 'image',
    };
    const category = await this.categoryModel.create(data);

    await this.websiteInfoModel.create({
      name: faker.name.title(),
      logo: faker.image.business(30, 30),
      homeSliderImages: [faker.image.business(300, 100), faker.image.business(300, 100)],
      homeEndImages: [
        faker.image.business(300, 100),
        faker.image.business(300, 100),
        faker.image.business(300, 100),
      ],
      blogPicture: faker.image.business(100, 100),
      homeCategories: [category],
      instagramLink: faker.internet.url(),
      twitterLink: faker.internet.url(),
      linkedinLink: faker.internet.url(),
      newest: true,
      mostDiscounts: true,
      mostSales: true,
      specialOffers: true,
      mostVisited: true,
      newsLetterEmails: [faker.internet.email(), faker.internet.email()],
      Advantages: [' '],
    });
  }
}
