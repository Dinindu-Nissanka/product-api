import { RESTDataSource } from 'apollo-datasource-rest';
import config from 'config';
import { ProductCreate, ProductUpdate, ProductView } from '../types';

export class ProductAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://${config.get('api.host')}:${config.get(
      'api.port'
    )}${config.get('api.baseUrl')}/products`;
  }

  async getAllProducts(): Promise<ProductView[]> {
    return this.get('/');
  }

  async getProduct(id: string): Promise<ProductView> {
    return this.get(`/${id}`);
  }

  async createProduct(product: ProductCreate): Promise<ProductView> {
    return this.post('/', { ...product });
  }

  async updateProduct(
    id: string,
    product: ProductUpdate
  ): Promise<ProductView> {
    return this.put(`/${id}`, { ...product });
  }
}
