import { Request, Response, NextFunction } from 'express';
import * as BrandService from '../services/brand.service';
import Logger from '../util/logger';
import { Brand } from '../types/brand.type';

/**
 * Returns all the brands
 * @param req
 * @param res
 * @param next
 */
export const getAllBrands = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const brands: Brand[] = await BrandService.findAll();
    res.status(200).send(brands);
  } catch (error) {
    Logger.error(`Error occurred while fetching all the brands ${error}`);
    next(error);
  }
};
