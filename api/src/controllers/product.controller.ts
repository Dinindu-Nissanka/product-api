import { Request, Response, NextFunction } from 'express';
import csv from 'csv-parser';
import fs from 'fs';
import * as ProductService from '../services/product.service';
import {
  ProductCreateView,
  ProductPost,
  ProductView,
} from '../types/product.type';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';
import Logger from '../util/logger';
import FileNotFoundException from '../exceptions/FileNotFoundException';

/**
 * Returns all the products
 * @param req
 * @param res
 * @param next
 */
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products: ProductView[] = await ProductService.findAll();
    res.status(200).send(products);
  } catch (error) {
    Logger.error(`Error occurred while fetching all the products ${error}`);
    next(error);
  }
};

/**
 * Returns the product details filter by product id
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id: string = req.params.id;
  try {
    const product: ProductView | null = await ProductService.find(id);
    if (product) {
      return res.status(200).send(product);
    }
    Logger.error(`No product found with id ${id}`);
    next(new ProductNotFoundException(id));
  } catch (error) {
    Logger.error(
      `Error occurred while fetching the product of id ${id} ${error}`
    );
    next(error);
  }
};

/**
 * Function to create a new product
 * @param req
 * @param res
 * @param next
 */
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const product: ProductPost = req.body;
    const newItem: ProductCreateView = await ProductService.create(product);

    res.status(201).send(newItem);
  } catch (error) {
    Logger.error(`Error occurred while creating the new product ${error}`);
    next(error);
  }
};

/**
 * Function to update a product
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id: string = req.params.id;

  try {
    const itemUpdate: ProductPost = req.body;
    const existingItem: ProductView | null = await ProductService.find(id);
    if (existingItem) {
      const updatedItem = await ProductService.update(id, itemUpdate);
      return res.status(200).send(updatedItem);
    }
    Logger.error(`No product found with id ${id}`);
    next(new ProductNotFoundException(id));
  } catch (error) {
    Logger.error(
      `Error occurred while updating the product with id ${id} ${error}`
    );
    next(error);
  }
};

/**
 * Function to delete a product
 * @param req
 * @param res
 * @param next
 */
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id: string = req.params.id;
  try {
    const existingProduct: ProductView | null = await ProductService.find(id);
    if (existingProduct) {
      await ProductService.remove(id);
      return res.status(204).send();
    }
    Logger.error(`No product found with id ${id}`);
    next(new ProductNotFoundException(id));
  } catch (error) {
    Logger.error(
      `Error occurred while deleting the product with id ${id} ${error}`
    );
    next(error);
  }
};

/**
 * Function to create bulk of products given via csv file
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const createProductsFromCSV = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      Logger.error(`No csv file has been uploded for bulk creation`);
      return next(new FileNotFoundException('No csv file has been uploaded'));
    }

    const products: ProductPost[] = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
        products.push(row);
      })
      .on('end', async () => {
        Logger.info('CSV file successfully processed');
        const insertedProducts = await ProductService.createBulk(products);
        return res.status(201).json(insertedProducts);
      });
  } catch (error) {
    Logger.error(
      `Error occurred while bulk creation of products via csv file upload ${error}`
    );
    next(error);
  }
};
