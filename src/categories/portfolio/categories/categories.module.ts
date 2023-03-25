import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PortfolioCategory0, PortfolioCategory1, PortfolioCategory2, PortfolioCategory3,
} from 'src/common/entities/category.model';
import {
  PortfolioCategory0Schema, PortfolioCategory1Schema, PortfolioCategory2Schema, PortfolioCategory3Schema,
} from 'src/common/entities/category.schema';
import { PortfolioArticleModule } from '../articles/articles.module';
import { PortfolioPageModule } from '../pages/pages.module';

import { PortfolioCategory0Resolver } from './resolvers/categories0.resolver';
import { PortfolioCategory1Resolver } from './resolvers/categories1.resolver';
import { PortfolioCategory2Resolver } from './resolvers/categories2.resolver';
import { PortfolioCategory3Resolver } from './resolvers/categories3.resolver';
import { PortfolioCategory0Service } from './services/categories0.service';
import { PortfolioCategory1Service } from './services/categories1.service';
import { PortfolioCategory2Service } from './services/categories2.service';
import { PortfolioCategory3Service } from './services/categories3.service';

@Module({
  imports: [
    forwardRef(() => PortfolioPageModule),
    PortfolioArticleModule,
    MongooseModule.forFeature(
      [
        { name: PortfolioCategory0.name, schema: PortfolioCategory0Schema },
        { name: PortfolioCategory1.name, schema: PortfolioCategory1Schema },
        { name: PortfolioCategory2.name, schema: PortfolioCategory2Schema },
        { name: PortfolioCategory3.name, schema: PortfolioCategory3Schema },
      ],
      'portfolioDB',
    ),
  ],
  providers: [
    PortfolioCategory0Resolver,
    PortfolioCategory1Resolver,
    PortfolioCategory2Resolver,
    PortfolioCategory3Resolver,
    PortfolioCategory0Service,
    PortfolioCategory1Service,
    PortfolioCategory2Service,
    PortfolioCategory3Service,
  ],
  exports: [
    PortfolioCategory0Service,
    PortfolioCategory1Service,
    PortfolioCategory2Service,
    PortfolioCategory3Service,
  ],
})
export class PortfolioCategoryModule {}
