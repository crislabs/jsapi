import { Module } from '@nestjs/common';
import { PortfolioArticleModule } from './articles/articles.module';
import { PortfolioAuthModule } from './auth/auth.module';
import { PortfolioCategoryModule } from './categories/categories.module';
import { PortfolioPageModule } from './pages/pages.module';
import { PortfolioSiteModule } from './sites/sites.module';
import { PortfolioUserModule } from './users/users.module';

@Module({
  imports: [
    PortfolioPageModule,
    PortfolioArticleModule,
    PortfolioSiteModule,
    PortfolioCategoryModule,
    PortfolioUserModule,
    PortfolioAuthModule,
  ],
})
export class PortfolioModule {}
