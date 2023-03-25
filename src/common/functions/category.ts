import { Types } from 'mongoose';
import { slug } from 'utils/function';
import { CreateCategory, UpdateCategory } from '../dto/category.input';
import {
  InputImage,
  UpdateImage,
} from '../dto/site.input';

export function categoryCreated({
  type,
  name,
  description,
  parentId,
  siteId,
  uid,
}: CreateCategory,
paths: string[]
) {
  return {
    _id: new Types.ObjectId(),
    data: {
      // type: type,
      type: {
        label: typeCategory(type),
        slug: type,
      },
      name: name,
      description: description,
      
      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'create category',
            updatedAt: new Date(),
          },
        ],
      },
      siteId: siteId,
      paths: [...paths, slug(name)]
    },
    parentId: parentId,
    slug: slug(name),
  };
}

export function categoryUpdate({ id, type, name, description, uid }: UpdateCategory) {
  return {
    $set: {
      'data.type': {
        label: typeCategory(type),
        slug: type,
      },
      'data.name': name,
      'data.description': description,
      'data.updateDate.lastUpdatedAt': new Date(),
      slug: slug(name),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'update category',
        updatedAt: new Date(),
      },
    },
  };
}

export function categoryUpdateImage({ id, images, type, uid }: UpdateImage) {
  const { src, alt } = images as InputImage;
  return {
    $set: {
      'data.thumbnailUrl': src,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'image update',
        updatedAt: new Date(),
      },
    },
  };
}

// export function categoryFindOne(id: string) {
//   return {
//     filter: { _id: id },
//     projection: {},
//     options: { lean: true },
//   };
// }

export function category0(id: string, uid: string) {
  return {
    name: 'Home',
    description: 'home description',
    type: 'category-blank',
    parentId: id,
    siteId: id,
    uid: uid,
  };
}

export function typeCategory(type: string) {
  let data: string;
  switch (type) {
    case 'category':
      data = 'Category';
      break;
    case 'category-blank':
      data = 'Category Blank';
      break;
    case 'adoption':
      data = 'Adoption';
      break;
    case 'category':
      data = 'Category';
      break;
    case 'article':
      data = 'Article';
      break;
    case 'sub-category':
      data = 'Sub Category';
      break;
    case 'contact':
      data = 'Contact';
      break;

    default:
      console.log(`Sorry, we are out of ${type}.`);
      break;
  }
  return data;
}
