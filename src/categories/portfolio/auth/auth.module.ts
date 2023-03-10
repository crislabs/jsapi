import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { PortfolioPage } from 'src/common/entities/page.model';
import { PortfolioPageSchema } from 'src/common/entities/page.schema';
import { PortfolioUserModule } from '../users/users.module';
import { PortfolioAuthResolver } from './auth.resolver';
import { PortfolioAuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    ConfigModule,
    PortfolioUserModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync ({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        }
      },
      inject: [ConfigService],
    }),
    // MongooseModule.forFeature(
    //   [{ name: PortfolioPage.name, schema: PortfolioPageSchema },],
    //   'portfolioDB',
    // ),
  ],
  providers: [PortfolioAuthResolver, PortfolioAuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, JwtModule]
})
export class PortfolioAuthModule {}
