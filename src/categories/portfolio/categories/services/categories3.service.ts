import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategory, UpdateCategory } from 'src/common/dto/category.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PortfolioCategory1, PortfolioCategory2, PortfolioCategory3 } from 'src/common/entities/category.model';
import { CategoryDocument } from 'src/common/entities/category.schema';
import {
  categoryCreated,
  categoryUpdate,
  categoryUpdateImage,
} from 'src/common/functions/category';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { slug } from 'utils/function';

@Injectable()
export class PortfolioCategory3Service {
  constructor(
    @InjectModel(PortfolioCategory3.name, 'portfolioDB')
    private categoryModel: Model<CategoryDocument>,
  ) { }
    
  async create(input: CreateCategory, paths: string[]) {
    const category = await this.categoryModel.findOne(
      {
        slug: slug(input.name),
        'data.siteId': input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );

    if (category) {
      throw new UnprocessableEntityException(
        `Ya tienes una página con este nombre "${input.name}" registrado`,
      );
    }
    const createdDocument = new this.categoryModel(categoryCreated(input, paths));
    return (await createdDocument.save()).toJSON();
  }

  async update(input: UpdateCategory) {
    const category = await this.categoryModel.findOne(
      {
        _id: { $ne: input.id },
        slug: slug(input.name),
        'data.siteId': input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );
    if (category) {
      throw new UnprocessableEntityException(
        `Ya tienes una página con este nombre "${input.name}" registrado`,
      );
    }
    const document = await this.categoryModel.findOneAndUpdate(
      { _id: input.id },
      categoryUpdate(input),
      { lean: true, new: true },
    );
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async updateImage(input: UpdateImage) {
    const document = await this.categoryModel.findOneAndUpdate(
      { _id: input.id },
      categoryUpdateImage(input),
      { lean: true, new: true },
    );
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async deleteOne(id: string) {
    await this.categoryModel.deleteOne({ _id: id });
    // await this.category1Service.deleteManyByParentId([id])
    return id;
  }

  async deleteMany(ids: string[]) {
    await this.categoryModel.deleteMany({ _id: { $in: ids } });
    // await this.category1Service.deleteManyByParentId(ids)
    return ids;
  }

  async deleteManyByParentId(ids: string[]) {
    await this.categoryModel.deleteMany({ parentId: { $in: ids } });
    // await this.category1Service.deleteManyByParentId(ids)
    return 'categorys delete';
  }

  async deleteManyBySiteId(ids: string[]) {
    await this.categoryModel.deleteMany({ 'data.siteId': { $in: ids } });
    return 'categorys delete';
  }

  async deleteAll() {
    await this.categoryModel.deleteMany();
    return 'categorys delete';
  }

  findAll() {
    return this.categoryModel.find();
  }

  findByParentId(parentId: string) {
    return this.categoryModel.find({ parentId: parentId });
  }

  findBySiteId(siteId: string) {
    return this.categoryModel.find({ 'data.siteId': siteId });
  }

  findByParentIdByPagination(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    return this.categoryModel.find({ parentId: parentId }).sort({ 'data.updateDate.lastUpdatedAt': -1 }).skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const document = await this.categoryModel.findOne(
      { _id: id },
      {},
      { lean: true },
    );
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async findOneBySlug(slug: string, siteId: string) {
    const document = await this.categoryModel.findOne(
      { slug: slug, 'data.siteId': siteId },
      {},
      { lean: true },
    );
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async findByCursor(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    const count = await this.categoryModel.count({ parentId: parentId });
    const data = await this.categoryModel
      .find({ parentId: parentId }, {}, { lean: true })
      .sort({ 'data.updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
    return { data, count };
  }
}
