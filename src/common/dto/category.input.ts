import { InputType, Field, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateCategory {
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field()
  readonly parentId: string;
  @Field()
  readonly siteId: string;
  @Field()
  readonly uid?: string;
}
@InputType()
export class UpdateCategory extends OmitType(CreateCategory, [] as const) {
  @Field()
  readonly id: string;
}
