import { ProductAPI } from '../datasource/index';

export interface Brand {
  id: string;
  name: string;
}

export interface ProductBase {
  name: string;
  slug: string;
  sku: string;
}
export interface ProductCreate extends ProductBase {
  brandId: string;
}

export interface ProductUpdate {
  name?: string;
  slug?: string;
  sku?: string;
  brandId?: string;
}

export interface ProductView extends ProductBase {
  id: string;
}

export interface Datasource {
  productAPI: ProductAPI;
}
