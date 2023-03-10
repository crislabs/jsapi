import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateArticle,
  UpdateArticle,
  UpdateContentArticle,
  UpdateLikesArticle,
  UpdateTagsArticle,
} from 'src/common/dto/article.input';
import { UpdateImage, UpdateImageProduct } from 'src/common/dto/site.input';
import { PortfolioArticle } from 'src/common/entities/article.model';
import { ArticleDocument } from 'src/common/entities/article.schema';
import {
  articleContentUpdated,
  articleCreated,
  articleDisLikesUpdated,
  articleImagesUpdated,
  articleImageUpdated,
  articleLikesUpdated,
  articleTagsUpdated,
  articleUpdated,
} from 'src/common/functions/article';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { slug } from 'utils/function';

@Injectable()
export class PortfolioArticleService {
  constructor(
    @InjectModel(PortfolioArticle.name, 'portfolioDB')
    private articleModel: Model<ArticleDocument>,
  ) {}

  async create(input: CreateArticle) {
    const article = await this.articleModel.findOne(
      {
        slug: slug(input.name),
        'data.siteId': input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );

    if (article) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `Ya tienes un artículo con este nombre "${input.name}" registrado`,
      );
    }
    const data = new this.articleModel(articleCreated(input));
    return (await data.save()).toJSON();
  }

  async update(input: UpdateArticle) {
    const article = await this.articleModel.findOne(
      {
        _id: { $ne: input.id },
        slug: slug(input.name),
        'data.siteId': input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );
    if (article) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `Ya tienes un artículo con este nombre "${input.name}" registrado`,
      );
    }
    const data = await this.articleModel.findOneAndUpdate(
      { _id: input.id },
      articleUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }

  async updateLikes(input: UpdateLikesArticle) {
    const data = await this.articleModel.findOneAndUpdate(
      { _id: input.id },
      articleLikesUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateDisLikes(input: UpdateLikesArticle) {
    const data = await this.articleModel.findOneAndUpdate(
      { _id: input.id },
      articleDisLikesUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }

  async updateImage(input: UpdateImage) {
    const data = await this.articleModel.findOneAndUpdate(
      { _id: input.id },
      articleImageUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }

  async updateContent(input: UpdateContentArticle) {
    const data = await this.articleModel.findOneAndUpdate(
      { _id: input.id },
      articleContentUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateTags(input: UpdateTagsArticle) {
    const data = await this.articleModel.findOneAndUpdate(
      { _id: input.id },
      articleTagsUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }

  async updateImages(input: UpdateImageProduct) {
    const data = await this.articleModel.findOneAndUpdate(
      { _id: input.id },
      articleImagesUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }

  async deleteOne(id: string) {
    await this.articleModel.deleteOne({ _id: id });
    return id;
  }

  async deleteMany(ids: string[]) {
    await this.articleModel.deleteMany({ _id: { $in: ids } });
    return ids;
  }

  async deleteManyBySiteId(ids: string[]) {
    await this.articleModel.deleteMany({ 'data.siteId': { $in: ids } });
    return 'articles delete';
  }
  async deleteManyByParentId(ids: string[]) {
    await this.articleModel.deleteMany({ parentId: { $in: ids } });
    return 'articles delete';
  }

  async deleteAll() {
    await this.articleModel.deleteMany();
    return 'articles delete';
  }

  findAll() {
    const data = this.articleModel.find({});
    return data;
  }

  findBySiteId(siteId: string) {
    const data = this.articleModel.find({ 'data.siteId': siteId });
    return data;
  }

  findByParentId(parentId: string) {
    const data = this.articleModel.find({ parentId: parentId });
    return data;
  }
  findByUserId(userId: string) {
    const data = this.articleModel.find({ 'data.author': userId });
    return data;
  }

  async findOne(id: string) {
    const document = await this.articleModel.findOne({ _id: id });
    if (!document) throw new NotFoundException('Document not found.');
    return document;
  }

  async findOneBySlug(slug: string, siteId: string) {
    const document = await this.articleModel.findOne({
      slug: slug,
      siteId: siteId,
    });
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }
  

  findByParentIdByPagination(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    return this.articleModel.find({ parentId: parentId }).sort({ 'data.updateDate.lastUpdatedAt': -1 }).skip(offset).limit(limit).exec();
  }

  async findByCursorByParentId(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    const count = await this.articleModel.count({ parentId: parentId });
    const data = await this.articleModel
      .find({ parentId: parentId }, {}, { lean: true })
      .sort({ 'data.updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
    return { data, count };
  }
  async findByCursorBySiteId(paginationQuery: ListInput, siteId: string) {
    const { limit, offset } = paginationQuery;
    const count = await this.articleModel.count({ 'data.siteId': siteId });
    const data = await this.articleModel
      .find({ 'data.siteId': siteId }, {}, { lean: true })
      // .sort({ 'data.updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
    return { data, count };
  }
}
