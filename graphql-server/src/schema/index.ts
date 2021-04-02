import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    products: [Product]
    product(id: String!): Product
  }

  type Mutation {
    createProduct(product: ProductCreateRequest!): ProductCreateResponse!
    updateProduct(
      id: String!
      product: ProductUpdateRequest!
    ): ProductUpdateResponse!
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

  type ProductCreateResponse {
    name: String!
    slug: String!
    sku: String!
    id: String!
  }
  type ProductUpdateResponse {
    name: String
    slug: String
    sku: String
    id: String
  }
`;
export default typeDefs;
