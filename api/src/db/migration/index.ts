import { sequelize } from '../index';
import * as uuid from 'uuid';
import BrandModel from '../models/brand.model';

const env = process.env.NODE_ENV || 'development';

export const migrate = (): void => {
  if (env === 'development') {
    sequelize.sync().then(async () => {
      const isDummyBrandExist = await BrandModel.findOne({
        where: { name: 'Adidas' },
      });
      if (!isDummyBrandExist) {
        await BrandModel.create({
          name: 'Adidas',
          id: uuid.v1(),
        });
      }
    });
  }
};
