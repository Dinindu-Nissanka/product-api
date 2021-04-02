import { ProductCreateView, ProductView } from '../types/product.type';

export const transformToProductView = (result: any): ProductView => {
  return {
    id: result.id,
    sku: result.sku,
    slug: result.slug,
    name: result.name,
    brand: {
      id: result.brand.id,
      name: result.brand.name,
    },
  };
};

export const transformToProductCreateView = (
  result: any
): ProductCreateView => {
  return {
    id: result.id,
    sku: result.sku,
    slug: result.slug,
    name: result.name,
  };
};
