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
  ListPortfolioCategory2,
  PortfolioCategory0,
  PortfolioCategory1,
  PortfolioCategory2,
  PortfolioCategory3,
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
import { PortfolioCategory3Service } from '../services/categories3.service';
// import { PortfolioAdoptionService } from 'src/adoptions/categories/portfolio/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/category.service';
// import { PortfolioArticleService } from 'src/articles/categories/portfolio/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/category.service';
// import { PortfolioAdoption } from 'src/common/entities/adoption.model';

@Resolver(() => PortfolioCategory2)
export class PortfolioCategory2Resolver {
  constructor(
    private readonly category1Service: PortfolioCategory1Service,
    private readonly category2Service: PortfolioCategory2Service,
    private readonly category3Service: PortfolioCategory3Service,
    private readonly articleService: PortfolioArticleService,
  ) {}

  @Mutation(() => PortfolioCategory2, { name: 'portfolioCreateCategory2' })
  async createCategory(@Args('input') input: CreateCategory) {
    const { data: { paths }} = await this.category1Service.findOne(input.parentId)

    return this.category2Service.create(input, paths);
  }

  @Mutation(() => PortfolioCategory2, { name: 'portfolioUpdateCategory2ById' })
  updateCategory(
    @Args('input') input: UpdateCategory,
    // @Args('type') type: string,
  ) {
    return this.category2Service.update(input);
  }

  @Mutation(() => PortfolioCategory2, { name: 'portfolioUpdateImageCategory2ById' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.category2Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeleteCategory2ById' })
  deleteCategory(@Args('id') id: string) {
    this.category1Service.deleteManyByParentId([id]);
    // this.adoptionService.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    this.articleService.deleteManyByParentId([id]);
    return this.category2Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeleteCategories2ById' })
  deleteCategorysById(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    this.category1Service.deleteManyByParentId(ids);
    // this.adoptionService.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    this.articleService.deleteManyByParentId(ids);
    return this.category2Service.deleteMany(ids);
  }

  // @Mutation(() => String, { name: 'portfolioDeleteAllCategorys1' })
  // deleteAllCategorys() {
  //   this.category1Service.deleteAll();
  //   // this.adoptionService.deleteAll();
  //   this.productService.deleteAll();
  //   this.articleService.deleteAll();
  //   return this.category1Service.deleteAll();
  // }

  @Query(() => PortfolioCategory2, { name: 'portfolioGetCategory2ById' })
  findCategory(@Args('id') id: string) {
    return this.category2Service.findOne(id);
  }

  @Query(() => PortfolioCategory2, { name: 'portfolioGetCategory2BySlug' })
  findCategoryBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.category2Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioCategory2], { name: 'portfolioGetCategories2' })
  findCategorys() {
    return this.category2Service.findAll();
  }

  @Query(() => [PortfolioCategory2], { name: 'portfolioGetCategories2ByParentId' })
  findCategorysByParentId(
    @Args('parentId') parentId: string,
  ) {
    return this.category2Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioCategory2], { name: 'portfolioGetCategories2BySiteId' })
  findCategorysBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.category2Service.findBySiteId(siteId);
  }

  @Query(() => [PortfolioCategory2], { name: 'portfolioGetCategories2ByParentIdByPagination' })
  findCategorysByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.category2Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioCategory2, { name: 'portfolioGetCategories2WithCursorByParentId' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioCategory2> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.category2Service.findByCursor(
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

  @ResolveField('categories', () => [PortfolioCategory3], { nullable: 'itemsAndList' })
  getCategorys(@Parent() { _id, data }: PortfolioCategory2) {
    const { type } = data as DataCategory;
    const { slug } = type as Type;
    if (slug === 'category') {
      return this.category3Service.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

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
