import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PortfolioCategory0,
} from 'src/common/entities/category.model';
import {
  PortfolioCategory0Schema,
} from 'src/common/entities/category.schema';
import { PortfolioArticleModule } from '../articles/articles.module';

import { PortfolioCategory0Resolver } from './resolvers/categories0.resolver';
import { PortfolioCategory0Service } from './services/categories0.service';

@Module({
  imports: [
    PortfolioArticleModule,
    MongooseModule.forFeature(
      [
        { name: PortfolioCategory0.name, schema: PortfolioCategory0Schema },
      ],
      'portfolioDB',
    ),
  ],
  providers: [
    PortfolioCategory0Resolver,
    PortfolioCategory0Service,
  ],
  exports: [
    PortfolioCategory0Service,
  ],
})
export class PortfolioCategoryModule {}
