import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import {
  DataCategory,
  ListPortfolioCategory0,
  ListPortfolioCategory1,
  PortfolioCategory0,
  PortfolioCategory1,
  PortfolioCategory2,
} from 'src/common/entities/category.model';
import { PortfolioCategory0Service } from '../services/categories0.service';
import { CreateCategory, UpdateCategory } from 'src/common/dto/category.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PortfolioProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioAdoptionService } from 'src/products/categories/portfolio/portfolio-adoption/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio/category.service';
// import { PortfolioArticleService } from 'src/articles/categories/portfolio/category.service';
import { PortfolioArticle } from 'src/common/entities/article.model';
// import { PortfolioCategory1Service } from '../services/category1.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { PortfolioArticleService } from '../../articles/articles.service';
import { PortfolioCategory1Service } from '../services/categories1.service';
import { PortfolioCategory2Service } from '../services/categories2.service';
// import { PortfolioAdoptionService } from 'src/adoptions/categories/portfolio/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/category.service';
// import { PortfolioArticleService } from 'src/articles/categories/portfolio/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/category.service';
// import { PortfolioAdoption } from 'src/common/entities/adoption.model';

@Resolver(() => PortfolioCategory1)
export class PortfolioCategory1Resolver {
  constructor(
    private readonly category1Service: PortfolioCategory1Service,
    private readonly category2Service: PortfolioCategory2Service,
    // // private readonly adoptionService: PortfolioAdoptionService,
    // private readonly productService: PortfolioProductService,
    private readonly articleService: PortfolioArticleService,
  ) {}

  @Mutation(() => PortfolioCategory1, { name: 'portfolioCreateCategory1' })
  createCategory(@Args('input') input: CreateCategory) {
    return this.category1Service.create(input);
  }

  @Mutation(() => PortfolioCategory1, { name: 'portfolioUpdateCategory1ById' })
  updateCategory(
    @Args('input') input: UpdateCategory,
    // @Args('type') type: string,
  ) {
    return this.category1Service.update(input);
  }

  @Mutation(() => PortfolioCategory1, { name: 'portfolioUpdateImageCategory1ById' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.category1Service.updateImage(input);
  }

  // @Mutation(() => String, { name: 'portfolioDeleteCategory1' })
  // deleteCategory(@Args('id') id: string) {
  //   this.category1Service.deleteManyByParentId([id]);
  //   // this.adoptionService.deleteManyByParentId([id]);
  //   this.productService.deleteManyByParentId([id]);
  //   this.articleService.deleteManyByParentId([id]);
  //   return this.category1Service.deleteOne(id);
  // }

  @Mutation(() => [String], { name: 'portfolioDeleteCategories1ById' })
  deleteCategorysById(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    // this.category1Service.deleteManyByParentId(ids);
    // this.adoptionService.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    this.articleService.deleteManyByParentId(ids);
    return this.category1Service.deleteMany(ids);
  }

  // @Mutation(() => String, { name: 'portfolioDeleteAllCategorys1' })
  // deleteAllCategorys() {
  //   this.category1Service.deleteAll();
  //   // this.adoptionService.deleteAll();
  //   this.productService.deleteAll();
  //   this.articleService.deleteAll();
  //   return this.category1Service.deleteAll();
  // }

  @Query(() => PortfolioCategory1, { name: 'portfolioGetCategory1ById' })
  findCategory(@Args('id') id: string) {
    return this.category1Service.findOne(id);
  }

  @Query(() => PortfolioCategory1, { name: 'portfolioGetCategory1BySlug' })
  findCategoryBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.category1Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioCategory1], { name: 'portfolioGetCategories1' })
  findCategorys() {
    return this.category1Service.findAll();
  }

  @Query(() => [PortfolioCategory1], { name: 'portfolioGetCategories1ByParentId' })
  findCategorysByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.category1Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioCategory1], { name: 'portfolioGetCategories1BySiteId' })
  findCategorysBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.category1Service.findBySiteId(siteId);
  }

  @Query(() => [PortfolioCategory1], { name: 'portfolioGetCategories1ByParentIdByPagination' })
  findCategorysByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.category1Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioCategory1, { name: 'portfolioGetCategories1WithCursorByParentId' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioCategory0> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.category1Service.findByCursor(
      {
        limit,
        offset,
      },
      parentId,
    );
    const category = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { category, categoryData: { count, limit, offset } };
  }

  @ResolveField('categories', () => [PortfolioCategory2], { nullable: 'itemsAndList' })
  getCategorys(@Parent() { _id, data }: PortfolioCategory1) {
    const { type } = data as DataCategory;
    const { slug } = type as Type;
    if (slug === 'category') {
      return this.category2Service.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  // @ResolveField('adoptions', () => [PortfolioAdoption], { nullable: 'itemsAndList' })
  // getAdoption(@Parent() { _id, data }: PortfolioCategory0) {
  //   const { type } = data as DataCategory;
  //   const { slug } = type as Type;

  //   if (slug === 'adoption') {
  //     return this.adoptionService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
  // @ResolveField('categorys', () => [PortfolioCategory1], { nullable: 'itemsAndList' })
  // getCategorys(@Parent() { _id, data }: PortfolioCategory0) {
  //   // const { type } = dataCategory as DataCategory;
  //   // const { slug } = type as Type;
  //   return this.category1Service.findByParentId(_id.toString());
  //   // if (slug === 'category') {
  //   // } else {
  //   //   return null;
  //   // }
  // }
  // @ResolveField('products', () => [PortfolioProduct], { nullable: 'itemsAndList' })
  // getProduct(@Parent() { _id, data }: PortfolioCategory0) {
  //   const { type } = data as DataCategory;
  //   const { slug } = type as Type;

  //   if (slug === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
  @ResolveField('articles', () => [PortfolioArticle], { nullable: 'itemsAndList' })
  getArticle(@Parent() { _id, data }: PortfolioCategory0) {
    const { type } = data as DataCategory;
    const { slug } = type as Type;
    if (slug === 'blog') {
      return this.articleService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
}
