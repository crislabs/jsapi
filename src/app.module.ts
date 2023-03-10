import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/config/common.module';

@Module({
  imports: [CommonModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
