import BrandModel from '../../src/db/models/brand.model';

export const brandSeed = async (): Promise<void> => {
  await BrandModel.bulkCreate([
    {
      id: 'e04c59e0-937c-11eb-8011-397198aa386a',
      name: 'Adidas',
    },
    {
      id: 'e04c59e1-937c-11eb-8011-397198aa386a',
      name: 'Nike',
    },
  ]);
};
