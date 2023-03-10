import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract/abstract.schema';
import { DataAdoption } from './adoption.model';

@Schema({ versionKey: false })
export class AdoptionDocument extends AbstractDocument {
  @Prop({ type: DataAdoption })
  data: DataAdoption;

  @Prop({ trim: true })
  slug: string;

  @Prop({ trim: true })
  parentId: string;
}

export const PetAdoptionSchema = SchemaFactory.createForClass(AdoptionDocument);
