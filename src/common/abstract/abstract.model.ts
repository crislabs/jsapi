import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType({ isAbstract: true })
export class AbstractModel {
  @Field(() => ID)
  readonly _id?: Types.ObjectId;
}
