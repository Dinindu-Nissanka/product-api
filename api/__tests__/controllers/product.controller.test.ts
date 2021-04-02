import { ProductController } from '../../src/controllers/index';
import ProductNotFoundException from '../../src/exceptions/ProductNotFoundException';
import * as ProductService from '../../src/services/product.service';

describe('Product API controller', () => {
  describe('Product API controller - getAllProducts', () => {
    it('Should retrieve array of products', async () => {
      const mProduct: any = [
        {
          id: '84b12b40-9314-11eb-83d9-f1250e34cac2',
          sku: 'skubackpack',
          slug: 'backpack',
          name: 'Backpack',
          brand: {
            id: '123e4567-e89b-12d3-a456-556642440000',
            name: 'Adidas',
          },
        },
      ];
      jest
        .spyOn(ProductService, 'findAll')
        .mockResolvedValueOnce(Promise.resolve(mProduct));
      const mReq: any = {};
      const mRes: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const mNext = jest.fn();
      await ProductController.getAllProducts(mReq, mRes, mNext);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith([
        {
          id: '84b12b40-9314-11eb-83d9-f1250e34cac2',
          sku: 'skubackpack',
          slug: 'backpack',
          name: 'Backpack',
          brand: {
            id: '123e4567-e89b-12d3-a456-556642440000',
            name: 'Adidas',
          },
        },
      ]);
    });
  });

  describe('Product API controller - getProductById', () => {
    it('Should retrieve one product', async () => {
      const mProduct: any = {
        id: '94b12b40-9314-11eb-83d9-f1250e34cac2',
        sku: 'skubackpack',
        slug: 'backpack',
        name: 'Backpack',
        brand: {
          id: '123e4567-e89b-12d3-a456-556642440000',
          name: 'Adidas',
        },
      };
      jest
        .spyOn(ProductService, 'find')
        .mockResolvedValueOnce(Promise.resolve(mProduct));
      const mReq: any = {
        params: { id: '94b12b40-9314-11eb-83d9-f1250e34cac2' },
      };
      const mRes: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const mNext = jest.fn();
      await ProductController.getProductById(mReq, mRes, mNext);
      expect(ProductService.find).toBeCalledWith(
        '94b12b40-9314-11eb-83d9-f1250e34cac2'
      );
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith({
        id: '94b12b40-9314-11eb-83d9-f1250e34cac2',
        sku: 'skubackpack',
        slug: 'backpack',
        name: 'Backpack',
        brand: {
          id: '123e4567-e89b-12d3-a456-556642440000',
          name: 'Adidas',
        },
      });
    });
  });

  describe('Product API controller - createProduct', () => {
    it('Should return created product', async () => {
      const mProduct: any = {
        id: '94b12b40-9314-11eb-83d9-f1250e34cac2',
        sku: 'skubackpack',
        slug: 'backpack',
        name: 'Backpack',
      };
      jest
        .spyOn(ProductService, 'create')
        .mockResolvedValueOnce(Promise.resolve(mProduct));
      const mReq: any = {
        body: {
          sku: 'skubackpack',
          slug: 'backpack',
          name: 'Backpack',
          brandId: '123e4567-e89b-12d3-a456-556642440000',
        },
      };
      const mRes: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const mNext = jest.fn();
      await ProductController.createProduct(mReq, mRes, mNext);
      expect(ProductService.create).toBeCalledWith({
        sku: 'skubackpack',
        slug: 'backpack',
        name: 'Backpack',
        brandId: '123e4567-e89b-12d3-a456-556642440000',
      });
      expect(mRes.status).toBeCalledWith(201);
      expect(mRes.send).toBeCalledWith({
        id: '94b12b40-9314-11eb-83d9-f1250e34cac2',
        sku: 'skubackpack',
        slug: 'backpack',
        name: 'Backpack',
      });
    });
  });

  describe('Product API controller - updateProduct', () => {
    it('Should return not found error for invalid id', async () => {
      jest
        .spyOn(ProductService, 'find')
        .mockResolvedValueOnce(Promise.resolve(null));
      const mReq: any = {
        params: { id: '94b12b40-9314-11eb-83d9-f1250e34cac2' },
      };
      const mRes: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
      const mNext = jest.fn();
      await ProductController.deleteProduct(mReq, mRes, mNext);
      expect(ProductService.find).toBeCalledWith(
        '94b12b40-9314-11eb-83d9-f1250e34cac2'
      );
      expect(mNext).toBeCalledWith(
        new ProductNotFoundException('94b12b40-9314-11eb-83d9-f1250e34cac2')
      );
    });
    it('Should update and return one product', async () => {
      const mProduct: any = {
        id: '94b12b40-9314-11eb-83d9-f1250e34cac2',
        sku: 'skubackpack',
        slug: 'backpack',
        name: 'Backpack',
        brand: {
          id: '123e4567-e89b-12d3-a456-556642440000',
          name: 'Adidas',
        },
      };
      jest
        .spyOn(ProductService, 'update')
        .mockResolvedValueOnce(Promise.resolve(mProduct));
      jest
        .spyOn(ProductService, 'find')
        .mockResolvedValueOnce(Promise.resolve(mProduct));
      const mReq: any = {
        params: { id: '94b12b40-9314-11eb-83d9-f1250e34cac2' },
        body: { name: 'test name' },
      };
      const mRes: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
      const mNext = jest.fn();
      await ProductController.updateProduct(mReq, mRes, mNext);
      expect(ProductService.update).toBeCalledWith(
        '94b12b40-9314-11eb-83d9-f1250e34cac2',
        {
          name: 'test name',
        }
      );
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith({
        id: '94b12b40-9314-11eb-83d9-f1250e34cac2',
        sku: 'skubackpack',
        slug: 'backpack',
        name: 'Backpack',
        brand: {
          id: '123e4567-e89b-12d3-a456-556642440000',
          name: 'Adidas',
        },
      });
    });
  });

  describe('Product API controller - deleteProduct', () => {
    it('Should return not found error for invalid id', async () => {
      jest
        .spyOn(ProductService, 'find')
        .mockResolvedValueOnce(Promise.resolve(null));
      const mReq: any = {
        params: { id: '94b12b40-9314-11eb-83d9-f1250e34cac2' },
      };
      const mRes: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
      const mNext = jest.fn();
      await ProductController.deleteProduct(mReq, mRes, mNext);
      expect(ProductService.find).toBeCalledWith(
        '94b12b40-9314-11eb-83d9-f1250e34cac2'
      );
      expect(mNext).toBeCalledWith(
        new ProductNotFoundException('94b12b40-9314-11eb-83d9-f1250e34cac2')
      );
    });
    it('Should delete one product', async () => {
      const mProduct: any = {
        id: '94b12b40-9314-11eb-83d9-f1250e34cac2',
        sku: 'skubackpack',
        slug: 'backpack',
        name: 'Backpack',
        brand: {
          id: '123e4567-e89b-12d3-a456-556642440000',
          name: 'Adidas',
        },
      };
      jest
        .spyOn(ProductService, 'remove')
        .mockResolvedValueOnce(Promise.resolve(1));
      jest
        .spyOn(ProductService, 'find')
        .mockResolvedValueOnce(Promise.resolve(mProduct));
      const mReq: any = {
        params: { id: '94b12b40-9314-11eb-83d9-f1250e34cac2' },
        body: { name: 'test name' },
      };
      const mRes: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
      const mNext = jest.fn();
      await ProductController.deleteProduct(mReq, mRes, mNext);
      expect(ProductService.remove).toBeCalledWith(
        '94b12b40-9314-11eb-83d9-f1250e34cac2'
      );
      expect(mRes.status).toBeCalledWith(204);
    });
  });
});
