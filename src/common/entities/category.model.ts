import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';
import { AbstractModel } from '../abstract/abstract.model';
import { Seo, Type, UpdateDate } from './site.model';

@ObjectType()
export class Category extends AbstractModel {
  @Field(() => DataCategory)
  readonly data: DataCategory | string;
  @Field()
  readonly slug: string;
  @Field()
  readonly parentId: string;
}

@ObjectType()
export class DataCategory {
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field({ nullable: true })
  readonly thumbnailUrl?: string;
  @Field(() => Type)
  readonly type: Type | string;
  @Field({ nullable: true })
  readonly icon?: string;
  @Field(() => [ComponentCategory])
  readonly section?: ComponentCategory[];
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
  @Field()
  readonly siteId: string;
}

@ObjectType()
export class ComponentCategory {
  @Field()
  readonly uid: string;
  @Field()
  readonly component: string;
  @Field()
  readonly html: string;
}

@ObjectType()
export class PortfolioCategory0 extends Category {}
@ObjectType()
export class PortfolioCategory1 extends Category {}
@ObjectType()
export class PortfolioCategory2 extends Category {}

@ObjectType()
export class ListPortfolioCategory0 extends RelayTypes<PortfolioCategory0>(PortfolioCategory0) {}
@ObjectType()
export class ListPortfolioCategory1 extends RelayTypes<PortfolioCategory1>(PortfolioCategory1) {}
@ObjectType()
export class ListPortfolioCategory2 extends RelayTypes<PortfolioCategory2>(PortfolioCategory2) {}
