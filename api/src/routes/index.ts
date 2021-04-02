import { Express, Request, Response } from 'express';
import * as ProductRoutes from './product.route';
import * as BrandRoutes from './brand.route';

const baseUrl = '/api/v1';

export const initRoutes = (app: Express): void => {
  app.get(baseUrl, (req: Request, res: Response) =>
    res.status(200).send({
      message: 'API is up and running',
    })
  );

  ProductRoutes.routes(app, baseUrl);
  BrandRoutes.routes(app, baseUrl);
};
