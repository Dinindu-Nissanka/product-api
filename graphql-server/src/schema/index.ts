import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    products: [Product]
    product(id: String!): Product
  }

  type Mutation {
    createProduct(product: ProductCreateRequest!): Product!
    updateProduct(id: String!, product: ProductUpdateRequest!): Product!
    deleteProduct(id: String!): Product
  }

  type Brand {
    id: String!
    name: String!
  }
  type Product {
    id: String
    name: String!
    slug: String!
    sku: String!
    brand: Brand
  }
  input ProductCreateRequest {
    name: String!
    slug: String!
    sku: String!
    brandId: String!
  }
  input ProductUpdateRequest {
    name: String
    slug: String
    sku: String
    brandId: String
  }
`;
export default typeDefs;
