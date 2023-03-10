import { Module } from '@nestjs/common';
import { PortfolioSiteService } from './sites.service';
import { PortfolioSiteResolver } from './sites.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioSite } from 'src/common/entities/site.model';
import { PortfolioSiteSchema } from 'src/common/entities/site.schema';
import { PortfolioPageModule } from '../pages/pages.module';

@Module({
  imports: [
    PortfolioPageModule,
    MongooseModule.forFeature(
      [{ name: PortfolioSite.name, schema: PortfolioSiteSchema }],
      'portfolioDB',
    ),
  ],
  providers: [PortfolioSiteResolver, PortfolioSiteService],
})
export class PortfolioSiteModule {}
