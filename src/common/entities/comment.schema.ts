import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../abstract/abstract.schema';
import { DataComment } from './comment.model';

@Schema({ versionKey: false })
export class CommentDocument extends AbstractDocument {
  @Prop({ type: DataComment })
  data: DataComment;
  @Prop({ trim: true })
  parentId: string;
}
export const FoodCommentSchema = SchemaFactory.createForClass(CommentDocument);
export const PetCommentSchema = SchemaFactory.createForClass(CommentDocument);
export const PortfolioCommentSchema = SchemaFactory.createForClass(CommentDocument);
export const HardwareStoreCommentSchema = SchemaFactory.createForClass(CommentDocument);
