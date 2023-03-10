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
  DataPage,
  ListPortfolioPage,
  PortfolioPage,
} from 'src/common/entities/page.model';
// import { PortfolioPageService } from '../services/page0.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PortfolioProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioAdoptionService } from 'src/products/categories/portfolio/portfolio-adoption/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio/category.service';
// import { PortfolioArticleService } from 'src/articles/categories/portfolio/category.service';
import { PortfolioArticle } from 'src/common/entities/article.model';
// import { PortfolioPage1Service } from '../services/page1.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { PortfolioPageService } from './pages.service';
import { PortfolioCategory0Service } from '../categories/services/categories0.service';
import { PortfolioCategory0 } from 'src/common/entities/category.model';
// import { PortfolioAdoptionService } from 'src/adoptions/categories/portfolio/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/category.service';
// import { PortfolioArticleService } from 'src/articles/categories/portfolio/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/category.service';
// import { PortfolioAdoption } from 'src/common/entities/adoption.model';

@Resolver(() => PortfolioPage)
export class PortfolioPageResolver {
  constructor(
    private readonly pageService: PortfolioPageService,
    private readonly category0Service: PortfolioCategory0Service,
  ) {}

  @Mutation(() => PortfolioPage, { name: 'portfolioCreatePage' })
  createPage(@Args('input') input: CreatePage) {
    return this.pageService.create(input);
  }

  @Mutation(() => PortfolioPage, { name: 'portfolioUpdatePageById' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pageService.update(input);
  }

  @Mutation(() => PortfolioPage, { name: 'portfolioUpdateImagePageById' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.pageService.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage' })
  deletePage(@Args('id') id: string) {
    // this.page1Service.deleteManyByParentId([id]);
    // // this.adoptionService.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    // this.articleService.deleteManyByParentId([id]);
    return this.pageService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    // this.page1Service.deleteManyByParentId(ids);
    // // this.adoptionService.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    // this.articleService.deleteManyByParentId(ids);
    return this.pageService.deleteMany(ids);
  }

  // @Mutation(() => String, { name: 'portfolioDeleteAllPages0' })
  // deleteAllPages() {
  //   this.page1Service.deleteAll();
  //   // this.adoptionService.deleteAll();
  //   this.productService.deleteAll();
  //   this.articleService.deleteAll();
  //   return this.pageService.deleteAll();
  // }

  @Query(() => PortfolioPage, { name: 'portfolioGetPageById' })
  findPage(@Args('id') id: string) {
    return this.pageService.findOne(id);
  }

  @Query(() => PortfolioPage, { name: 'portfolioGetPageBySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.pageService.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage], { name: 'portfolioGetPages' })
  findPages() {
    return this.pageService.findAll();
  }

  @Query(() => [PortfolioPage], { name: 'portfolioGetPagesByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pageService.findByParentId(parentId);
  }

  @Query(() => [PortfolioPage], { name: 'portfolioGetPagesBySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.pageService.findBySiteId(siteId);
  }

  @Query(() => [PortfolioPage], { name: 'portfolioGetPagesByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.pageService.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioPage, { name: 'portfolioGetPagesWithCursorByParentId' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.pageService.findByCursor(
      {
        limit,
        offset,
      },
      parentId,
    );
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  // @ResolveField('adoptions', () => [PortfolioAdoption], { nullable: 'itemsAndList' })
  // getAdoption(@Parent() { _id, data }: PortfolioPage0) {
  //   const { type } = data as DataPage;
  //   const { slug } = type as Type;

  //   if (slug === 'adoption') {
  //     return this.adoptionService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
  @ResolveField('categories', () => [PortfolioCategory0], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, data }: PortfolioPage) {
    const { type } = data as DataPage;
    const { slug } = type as Type;
    if ( slug === 'category') {
      return this.category0Service.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  // @ResolveField('products', () => [PortfolioProduct], { nullable: 'itemsAndList' })
  // getProduct(@Parent() { _id, data }: PortfolioPage0) {
  //   const { type } = data as DataPage;
  //   const { slug } = type as Type;

  //   if (slug === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
  // @ResolveField('articles', () => [PortfolioArticle], { nullable: 'itemsAndList' })
  // getArticle(@Parent() { _id, data }: PortfolioPage0) {
  //   const { type } = data as DataPage;
  //   const { slug } = type as Type;
  //   if (slug === 'blog') {
  //     return this.articleService.findByParentId(_id.toString());
  //   } else {
  //     return [];
  //   }
  // }
}
