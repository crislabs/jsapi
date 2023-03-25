import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '../abstract/abstract.model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';
import { Image, Seo, Tags, UpdateDate } from './site.model';

@ObjectType()
export class Article extends AbstractModel {
  @Field(() => DataArticle)
  readonly data: DataArticle | string;
  @Field()
  readonly parentId: string;
  @Field()
  readonly slug: string;
}
@ObjectType()
export class DataArticle {
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field({ nullable: true })
  readonly thumbnailUrl?: string;
  @Field({ nullable: true })
  readonly content?: string;
  @Field({ nullable: true })
  readonly siteId: string;
  @Field()
  readonly category?: string;
  @Field({ nullable: true })
  readonly meta?: string;
  @Field(() => [Tags], { nullable: true })
  readonly tags?: Tags[];
  @Field()
  readonly author: string;
 
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
  @Field(() => [String], { nullable: true })
  readonly likes?: string[];
  @Field(() => [Image], { nullable: true })
  readonly images?: Image[];
  @Field(() => [String], { nullable: true })
  readonly paths?: string[];
}


// @ObjectType()
// export class FoodArticle extends Article {}
// @ObjectType()
// export class MarketingArticle extends Article {}
@ObjectType()
export class PetArticle extends Article {}
@ObjectType()
export class ListPetArticle extends RelayTypes<PetArticle>(PetArticle) {}
@ObjectType()
export class FoodArticle extends Article {}
@ObjectType()
export class ListFoodArticle extends RelayTypes<FoodArticle>(FoodArticle) {}
@ObjectType()
export class PortfolioArticle extends Article {}
@ObjectType()
export class ListPortfolioArticle extends RelayTypes<PortfolioArticle>(PortfolioArticle) {}
@ObjectType()
export class HardwareStoreArticle extends Article {}
@ObjectType()
export class ListHardwareStoreArticle extends RelayTypes<HardwareStoreArticle>(HardwareStoreArticle) {}
