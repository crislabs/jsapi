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
  PortfolioCategory0,
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
// import { PortfolioAdoptionService } from 'src/adoptions/categories/portfolio/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/category.service';
// import { PortfolioArticleService } from 'src/articles/categories/portfolio/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/category.service';
// import { PortfolioAdoption } from 'src/common/entities/adoption.model';

@Resolver(() => PortfolioCategory0)
export class PortfolioCategory0Resolver {
  constructor(
    private readonly category0Service: PortfolioCategory0Service,
    // private readonly category1Service: PortfolioCategory1Service,
    // // private readonly adoptionService: PortfolioAdoptionService,
    // private readonly productService: PortfolioProductService,
    private readonly articleService: PortfolioArticleService,
  ) {}

  @Mutation(() => PortfolioCategory0, { name: 'portfolioCreateCategory0' })
  createCategory(@Args('input') input: CreateCategory) {
    return this.category0Service.create(input);
  }

  @Mutation(() => PortfolioCategory0, { name: 'portfolioUpdateCategory0ById' })
  updateCategory(
    @Args('input') input: UpdateCategory,
    // @Args('type') type: string,
  ) {
    return this.category0Service.update(input);
  }

  @Mutation(() => PortfolioCategory0, { name: 'portfolioUpdateImageCategory0ById' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.category0Service.updateImage(input);
  }

  // @Mutation(() => String, { name: 'portfolioDeleteCategory0' })
  // deleteCategory(@Args('id') id: string) {
  //   this.category1Service.deleteManyByParentId([id]);
  //   // this.adoptionService.deleteManyByParentId([id]);
  //   this.productService.deleteManyByParentId([id]);
  //   this.articleService.deleteManyByParentId([id]);
  //   return this.category0Service.deleteOne(id);
  // }

  @Mutation(() => [String], { name: 'portfolioDeleteCategories0ById' })
  deleteCategorysById(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    // this.category1Service.deleteManyByParentId(ids);
    // this.adoptionService.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    this.articleService.deleteManyByParentId(ids);
    return this.category0Service.deleteMany(ids);
  }

  // @Mutation(() => String, { name: 'portfolioDeleteAllCategorys0' })
  // deleteAllCategorys() {
  //   this.category1Service.deleteAll();
  //   // this.adoptionService.deleteAll();
  //   this.productService.deleteAll();
  //   this.articleService.deleteAll();
  //   return this.category0Service.deleteAll();
  // }

  @Query(() => PortfolioCategory0, { name: 'portfolioGetCategory0ById' })
  findCategory(@Args('id') id: string) {
    return this.category0Service.findOne(id);
  }

  @Query(() => PortfolioCategory0, { name: 'portfolioGetCategory0BySlug' })
  findCategoryBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.category0Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioCategory0], { name: 'portfolioGetCategories0' })
  findCategorys() {
    return this.category0Service.findAll();
  }

  @Query(() => [PortfolioCategory0], { name: 'portfolioGetCategories0ByParentId' })
  findCategorysByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.category0Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioCategory0], { name: 'portfolioGetCategories0BySiteId' })
  findCategorysBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.category0Service.findBySiteId(siteId);
  }

  @Query(() => [PortfolioCategory0], { name: 'portfolioGetCategories0ByParentIdByPagination' })
  findCategorysByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.category0Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioCategory0, { name: 'portfolioGetCategories0WithCursorByParentId' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioCategory0> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.category0Service.findByCursor(
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
