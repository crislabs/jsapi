import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioUser } from 'src/common/entities/user.model';
import { PortfolioUserSchema } from 'src/common/entities/user.schema';
import { PortfolioUserResolver } from './users.resolver';
import { PortfolioUserService } from './users.service';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: PortfolioUser.name, schema: PortfolioUserSchema }],
      'portfolioDB',
    ),
  ],
  providers: [PortfolioUserResolver, PortfolioUserService],
  exports: [PortfolioUserService],
})
export class PortfolioUserModule {}
