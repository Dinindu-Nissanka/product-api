import request from 'supertest';
import app from '../../src/server';
import * as ProductService from '../../src/services/product.service';
import { ProductView } from '../../src/types/product.type';
import { dropDatabase, initDatabase } from '../setUpDatabase';
import { brandSeed } from '../seeds/brand.seed';
import { productSeed } from '../seeds/product.seed';
import { sequelize } from '../../src/db';

const products: ProductView[] = [
  {
    id: '84b12b40-9314-11eb-83d9-f1250e34cac3',
    name: 'Shoe',
    slug: 'shoe',
    sku: 'shoesku',
    brand: {
      id: 'e04c59e0-937c-11eb-8011-397198aa386a',
      name: 'Adidas',
    },
  },
  {
    id: '84b12b41-9314-11eb-83d9-f1250e34cac3',
    name: 'Backpack',
    slug: 'backpack',
    sku: 'backpacksku',
    brand: {
      id: 'e04c59e1-937c-11eb-8011-397198aa386a',
      name: 'Nike',
    },
  },
];
const product: ProductView = {
  id: '84b12b40-9314-11eb-83d9-f1250e34cac3',
  name: 'Shoe',
  slug: 'shoe',
  sku: 'shoesku',
  brand: {
    id: 'e04c59e0-937c-11eb-8011-397198aa386a',
    name: 'Adidas',
  },
};

beforeAll(async () => {
  await initDatabase();
  await sequelize.sync();
  await brandSeed();
  await productSeed();
});

afterAll(async () => {
  await sequelize.drop();
  await dropDatabase();
});

afterEach(async () => {
  jest.resetModules();
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe('Product API routes', () => {
  describe('Product API - getAllProducts', () => {
    it('should return all the products', async () => {
      const res = await request(app).get('/api/v1/products');
      expect(res.status).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toEqual(products);
    });
  });

  describe('Product API - getProductById', () => {
    it('should return not found error for invalid id', async () => {
      const res = await request(app)
        .put('/api/v1/products/84b12b40-9314-11eb-83d9-f1250e34cac7')
        .send({ name: 'Test' });
      expect(res.status).toEqual(404);
      expect(res.body).toEqual({
        error: 'Product with id 84b12b40-9314-11eb-83d9-f1250e34cac7 not found',
        message: 'Not found',
        status: 404,
      });
    });
    it('should return product details', async () => {
      const res = await request(app).get(
        '/api/v1/products/84b12b40-9314-11eb-83d9-f1250e34cac3'
      );
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(product);
    });
  });

  describe('Product API - createProduct', () => {
    it('should return validation error for invalid body', async () => {
      const res = await request(app)
        .post('/api/v1/products')
        .send({ name: 'Test' });
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        error: [
          {
            slug: 'Invalid value',
          },
          {
            sku: 'Invalid value',
          },
          {
            brandId: 'Invalid value',
          },
        ],
        message: 'Bad Request',
        status: 400,
      });
    });
    it('should return Brand not found error', async () => {
      const res = await request(app).post('/api/v1/products').send({
        sku: 'skushoe',
        slug: 'shoe',
        name: 'Shoe',
        brandId: '123e4567-e89b-12d3-a456-556642440000',
      });
      expect(res.status).toEqual(404);
      expect(res.body).toEqual({
        error: 'Brand with id 123e4567-e89b-12d3-a456-556642440000 not found',
        message: 'Not found',
        status: 404,
      });
    });
    it('should return created product details', async () => {
      const res = await request(app).post('/api/v1/products').send({
        sku: 'skubottle',
        slug: 'bottle',
        name: 'Bottle',
        brandId: 'e04c59e0-937c-11eb-8011-397198aa386a',
      });
      expect(res.status).toEqual(201);
    });
  });

  describe('Product API - updateProductById', () => {
    it('should return not found error for invalid id', async () => {
      const res = await request(app)
        .put('/api/v1/products/84b12b40-9314-11eb-83d9-f1250e34cac7')
        .send({ name: 'Test' });
      expect(res.status).toEqual(404);
      expect(res.body).toEqual({
        error: 'Product with id 84b12b40-9314-11eb-83d9-f1250e34cac7 not found',
        message: 'Not found',
        status: 404,
      });
    });
    it('should return Brand not found error', async () => {
      const res = await request(app)
        .put('/api/v1/products/84b12b41-9314-11eb-83d9-f1250e34cac3')
        .send({
          brandId: '123e4567-e89b-12d3-a456-556642440000',
        });
      expect(res.status).toEqual(404);
      expect(res.body).toEqual({
        error: 'Brand with id 123e4567-e89b-12d3-a456-556642440000 not found',
        message: 'Not found',
        status: 404,
      });
    });
    it('should return updated product details', async () => {
      const res = await request(app)
        .put('/api/v1/products/84b12b40-9314-11eb-83d9-f1250e34cac3')
        .send({ name: 'Test' });
      expect(res.status).toEqual(200);
      expect(res.body).toEqual({ ...product, name: 'Test' });
    });
  });

  describe('Product API - deleteProductById', () => {
    it('should return not found error for invalid id', async () => {
      const res = await request(app).delete(
        '/api/v1/products/84b12b40-9314-11eb-83d9-f1250e34cac7'
      );
      expect(res.status).toEqual(404);
      expect(res.body).toEqual({
        error: 'Product with id 84b12b40-9314-11eb-83d9-f1250e34cac7 not found',
        message: 'Not found',
        status: 404,
      });
    });
    it('should return 204 for success delete', async () => {
      const res = await request(app).delete(
        '/api/v1/products/84b12b40-9314-11eb-83d9-f1250e34cac3'
      );
      expect(res.status).toEqual(204);
    });
  });
});
