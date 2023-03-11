import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PortfolioCategory0, PortfolioCategory1,
} from 'src/common/entities/category.model';
import {
  PortfolioCategory0Schema, PortfolioCategory1Schema,
} from 'src/common/entities/category.schema';
import { PortfolioArticleModule } from '../articles/articles.module';

import { PortfolioCategory0Resolver } from './resolvers/categories0.resolver';
import { PortfolioCategory1Resolver } from './resolvers/categories1.resolver';
import { PortfolioCategory0Service } from './services/categories0.service';
import { PortfolioCategory1Service } from './services/categories1.service';

@Module({
  imports: [
    PortfolioArticleModule,
    MongooseModule.forFeature(
      [
        { name: PortfolioCategory0.name, schema: PortfolioCategory0Schema },
        { name: PortfolioCategory1.name, schema: PortfolioCategory1Schema },
      ],
      'portfolioDB',
    ),
  ],
  providers: [
    PortfolioCategory0Resolver,
    PortfolioCategory1Resolver,
    PortfolioCategory0Service,
    PortfolioCategory1Service,
  ],
  exports: [
    PortfolioCategory0Service,
    PortfolioCategory1Service,
  ],
})
export class PortfolioCategoryModule {}
