import { Brand } from './brand.type';

export interface ProductBase {
  name: string;
  slug: string;
  sku: string;
}
export interface ProductPost extends ProductBase {
  brandId: string;
}

export interface ProductView extends ProductBase {
  id: string;
  brand: Brand;
}

export interface ProductCreateView extends ProductBase {
  id: string;
}
