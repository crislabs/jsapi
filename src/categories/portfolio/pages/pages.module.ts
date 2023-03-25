import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioPage } from 'src/common/entities/page.model';
import { PortfolioPageSchema } from 'src/common/entities/page.schema';
import { PortfolioCategoryModule } from '../categories/categories.module';
import { PortfolioPageResolver } from './pages.resolver';
import { PortfolioPageService } from './pages.service';

@Module({
  imports: [
    forwardRef(() => PortfolioCategoryModule),
    MongooseModule.forFeature(
      [{ name: PortfolioPage.name, schema: PortfolioPageSchema },],
      'portfolioDB',
    ),
  ],
  providers: [PortfolioPageResolver, PortfolioPageService],
  exports: [PortfolioPageService]
})
export class PortfolioPageModule {}
