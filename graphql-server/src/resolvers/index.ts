import {
  Datasource,
  ProductCreate,
  ProductUpdate,
  ProductView,
} from '../types';

const resolvers = {
  Query: {
    products: (
      root: any,
      args: any,
      { dataSources }: { dataSources: Datasource }
    ): Promise<ProductView[]> => dataSources.productAPI.getAllProducts(),
    product: (
      root: any,
      { id }: { id: string },
      { dataSources }: { dataSources: Datasource }
    ): Promise<ProductView> => dataSources.productAPI.getProduct(id),
  },
  Mutation: {
    createProduct: (
      _: any,
      { product }: { product: ProductCreate },
      { dataSources }: { dataSources: Datasource }
    ): Promise<ProductView> => dataSources.productAPI.createProduct(product),
    updateProduct: (
      _: any,
      { id, product }: { id: string; product: ProductUpdate },
      { dataSources }: { dataSources: Datasource }
    ): Promise<ProductView> =>
      dataSources.productAPI.updateProduct(id, product),
  },
};

export default resolvers;
