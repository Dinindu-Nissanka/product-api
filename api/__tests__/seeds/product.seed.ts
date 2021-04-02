import ProductModel from '../../src/db/models/product.model';

export const productSeed = async (): Promise<void> => {
  await ProductModel.bulkCreate([
    {
      id: '84b12b40-9314-11eb-83d9-f1250e34cac3',
      name: 'Shoe',
      slug: 'shoe',
      sku: 'shoesku',
      brandId: 'e04c59e0-937c-11eb-8011-397198aa386a',
    },
    {
      id: '84b12b41-9314-11eb-83d9-f1250e34cac3',
      name: 'Backpack',
      slug: 'backpack',
      sku: 'backpacksku',
      brandId: 'e04c59e1-937c-11eb-8011-397198aa386a',
    },
  ]);
};
