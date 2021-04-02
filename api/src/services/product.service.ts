import * as uuid from 'uuid';
import {
  ProductCreateView,
  ProductPost,
  ProductView,
} from '../types/product.type';
import ProductModel from '../db/models/product.model';
import BrandModel from '../db/models/brand.model';
import {
  transformToProductCreateView,
  transformToProductView,
} from '../tranformers';
import BrandNotFoundException from '../exceptions/BrandNotFoundException';

/**
 * Returns all the products
 * @returns
 */
export const findAll = async (): Promise<ProductView[] | []> => {
  const result = await ProductModel.findAll({ include: [{ all: true }] });
  return result.map((product) => transformToProductView(product));
};

/**
 * Returns requested product details
 * @param id
 * @returns
 */
export const find = async (id: string): Promise<ProductView | null> => {
  const result = await ProductModel.findOne({
    where: { id },
    include: [{ all: true }],
  });
  if (result) {
    return transformToProductView(result);
  }
  return result;
};

/**
 * Create new product
 * @param product
 * @returns
 */
export const create = async (
  product: ProductPost
): Promise<ProductCreateView> => {
  const brand = await BrandModel.findOne({ where: { id: product.brandId } });
  if (!brand) {
    throw new BrandNotFoundException(product.brandId);
  }
  const result = await ProductModel.create({
    id: uuid.v1(),
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    brandId: product.brandId,
  });
  if (result) {
    return transformToProductCreateView(result);
  }
  return result;
};

/**
 * Update a new product
 * @param id
 * @param itemUpdate
 * @returns
 */
export const update = async (
  id: string,
  itemUpdate: ProductPost
): Promise<ProductView | null> => {
  const item: ProductView | null = await find(id);

  if (!item) {
    return item;
  }

  if (itemUpdate.brandId) {
    const brand = await BrandModel.findOne({
      where: { id: itemUpdate.brandId },
    });
    if (!brand) {
      throw new BrandNotFoundException(itemUpdate.brandId);
    }
  }

  await ProductModel.update(
    {
      ...itemUpdate,
    },
    {
      where: {
        id,
      },
    }
  );

  return find(id);
};

/**
 * Delete a product
 * @param id
 * @returns
 */
export const remove = async (id: string): Promise<number | null> => {
  const item = await find(id);
  if (!item) {
    return null;
  }
  return await ProductModel.destroy({ where: { id } });
};

/**
 * Create bulk of products
 * @param products
 * @returns
 */
export const createBulk = async (
  products: ProductPost[]
): Promise<ProductCreateView[]> => {
  const prodArray = products.map((product) => ({
    id: uuid.v1(),
    ...product,
  }));
  const result = await ProductModel.bulkCreate(prodArray, {
    returning: true,
    include: [{ all: true }],
  });
  return result.map((product) => transformToProductCreateView(product));
};
