import BrandModel from '../db/models/brand.model';
import { transformToBrandView } from '../tranformers';
import { Brand } from '../types/brand.type';

/**
 * Returns all the products
 * @returns
 */
export const findAll = async (): Promise<Brand[] | []> => {
  const result = await BrandModel.findAll();
  return result.map((brand) => transformToBrandView(brand));
};
