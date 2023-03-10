import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../abstract/abstract.schema';
import { DataCategory } from './category.model';

@Schema({ versionKey: false })
export class CategoryDocument extends AbstractDocument {
  @Prop({ type: DataCategory })
  data: DataCategory;
  @Prop({ trim: true })
  slug: string;
  @Prop({ trim: true, index: true })
  parentId: string;
  @Prop({ trim: true, index: true })
  'data.siteId': string;
}


export const PortfolioCategory0Schema = SchemaFactory.createForClass(CategoryDocument);
export const PortfolioCategory1Schema = SchemaFactory.createForClass(CategoryDocument);
export const PortfolioCategory2Schema = SchemaFactory.createForClass(CategoryDocument);
export const PortfolioCategory3Schema = SchemaFactory.createForClass(CategoryDocument);
export const PortfolioCategory4Schema = SchemaFactory.createForClass(CategoryDocument);
export const PortfolioCategory5Schema = SchemaFactory.createForClass(CategoryDocument);
export const PortfolioCategory6Schema = SchemaFactory.createForClass(CategoryDocument);
export const PortfolioCategory7Schema = SchemaFactory.createForClass(CategoryDocument);
export const PortfolioCategory8Schema = SchemaFactory.createForClass(CategoryDocument);
export const PortfolioCategory9Schema = SchemaFactory.createForClass(CategoryDocument);
export const PortfolioCategory10Schema = SchemaFactory.createForClass(CategoryDocument);
export const PortfolioCategory11Schema = SchemaFactory.createForClass(CategoryDocument);
export const PortfolioCategory12Schema = SchemaFactory.createForClass(CategoryDocument);
