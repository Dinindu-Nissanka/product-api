import { Express } from 'express';
import multer from 'multer';
import { ProductController } from '../controllers';
import {
  productCreateValidationRules,
  productFetchValidationRules,
  productUpdateValidationRules,
  productDeleteValidationRules,
  productValidate,
} from '../validation/product.validation';

const upload = multer({ dest: './uploads' });

export const routes = (app: Express, baseUrl: string): void => {
  /**
   * Get all products
   */
  app.get(`${baseUrl}/products`, ProductController.getAllProducts);

  /**
   * Create new product
   */
  app.post(
    `${baseUrl}/products`,
    productCreateValidationRules(),
    productValidate,
    ProductController.createProduct
  );

  /**
   * Get product by id
   */
  app.get(
    `${baseUrl}/products/:id`,
    productFetchValidationRules(),
    productValidate,
    ProductController.getProductById
  );

  /**
   * Update product
   */
  app.put(
    `${baseUrl}/products/:id`,
    productUpdateValidationRules(),
    productValidate,
    ProductController.updateProduct
  );

  /**
   * Delete product
   */
  app.delete(
    `${baseUrl}/products/:id`,
    productDeleteValidationRules(),
    productValidate,
    ProductController.deleteProduct
  );

  /**
   * Create multiple products by uploading a csv file
   */
  app.post(
    `${baseUrl}/products/upload`,
    upload.single('csv'),
    ProductController.createProductsFromCSV
  );
};
