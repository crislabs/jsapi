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
  @Field(() => [String], { nullable: true })
  readonly paths?: string[];
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
export class PortfolioCategory3 extends Category {}
@ObjectType()
export class PortfolioCategory4 extends Category {}
@ObjectType()
export class PortfolioCategory5 extends Category {}
@ObjectType()
export class PortfolioCategory6 extends Category {}
@ObjectType()
export class PortfolioCategory7 extends Category {}
@ObjectType()
export class PortfolioCategory8 extends Category {}
@ObjectType()
export class PortfolioCategory9 extends Category {}
@ObjectType()
export class PortfolioCategory10 extends Category {}
@ObjectType()
export class PortfolioCategory11 extends Category {}
@ObjectType()
export class PortfolioCategory12 extends Category {}

@ObjectType()
export class ListPortfolioCategory0 extends RelayTypes<PortfolioCategory0>(PortfolioCategory0) {}
@ObjectType()
export class ListPortfolioCategory1 extends RelayTypes<PortfolioCategory1>(PortfolioCategory1) {}
@ObjectType()
export class ListPortfolioCategory2 extends RelayTypes<PortfolioCategory2>(PortfolioCategory2) {}
@ObjectType()
export class ListPortfolioCategory3 extends RelayTypes<PortfolioCategory3>(PortfolioCategory3) {}
@ObjectType()
export class ListPortfolioCategory4 extends RelayTypes<PortfolioCategory4>(PortfolioCategory4) {}
@ObjectType()
export class ListPortfolioCategory5 extends RelayTypes<PortfolioCategory5>(PortfolioCategory5) {}
@ObjectType()
export class ListPortfolioCategory6 extends RelayTypes<PortfolioCategory6>(PortfolioCategory6) {}
@ObjectType()
export class ListPortfolioCategory7 extends RelayTypes<PortfolioCategory7>(PortfolioCategory7) {}
@ObjectType()
export class ListPortfolioCategory8 extends RelayTypes<PortfolioCategory8>(PortfolioCategory8) {}
@ObjectType()
export class ListPortfolioCategory9 extends RelayTypes<PortfolioCategory9>(PortfolioCategory9) {}
@ObjectType()
export class ListPortfolioCategory10 extends RelayTypes<PortfolioCategory10>(PortfolioCategory10) {}
@ObjectType()
export class ListPortfolioCategory11 extends RelayTypes<PortfolioCategory11>(PortfolioCategory11) {}
@ObjectType()
export class ListPortfolioCategory12 extends RelayTypes<PortfolioCategory12>(PortfolioCategory12) {}
