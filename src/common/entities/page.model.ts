import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';
import { AbstractModel } from '../abstract/abstract.model';
import { Seo, Type, UpdateDate } from './site.model';

@ObjectType()
export class Page extends AbstractModel {
  @Field(() => DataPage)
  readonly data: DataPage | string;
  @Field()
  readonly slug: string;
  @Field()
  readonly parentId: string;
}

@ObjectType()
export class DataPage {
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
  @Field(() => [ComponentPage])
  readonly section?: ComponentPage[];
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
  @Field()
  readonly siteId: string;
}

@ObjectType()
export class ComponentPage {
  @Field()
  readonly uid: string;
  @Field()
  readonly component: string;
  @Field()
  readonly html: string;
}


@ObjectType()
export class PortfolioPage extends Page {}

@ObjectType()
export class ListPortfolioPage extends RelayTypes<PortfolioPage>(PortfolioPage) {}
