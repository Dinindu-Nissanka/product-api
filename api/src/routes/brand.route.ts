import { Express } from 'express';
import { BrandController } from '../controllers';

export const routes = (app: Express, baseUrl: string): void => {
  /**
   * Get all brands
   */
  app.get(`${baseUrl}/brands`, BrandController.getAllBrands);
};
