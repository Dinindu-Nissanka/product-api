import { gql } from 'apollo-server';
import testServer from './__mocks__/server.mock';
import { ProductAPI } from '../src/datasource/index';
import { ProductView } from '../src/types';
import {
  getAllProductsAPIResponse,
  getAllProductsGraphqlResponse,
  getProductAPIResponse,
  getProductGraphqlResponse,
  createProductAPIResponse,
  createProductGraphqlResponse,
  updateProductAPIResponse,
  updateProductGraphqlResponse,
} from './__mocks__/products.mock';

describe('ProductAPI', () => {
  it('fetches all products', async () => {
    const productAPI: ProductAPI = new ProductAPI();
    const getAllProductsStub = (): Promise<ProductView[]> =>
      Promise.resolve(getAllProductsAPIResponse);
    productAPI.getAllProducts = jest.fn(getAllProductsStub);

    const { query } = testServer(() => ({ productAPI }));

    const GET_PRODUCTS = gql`
      query getAllProducts {
        products {
          id
          name
          brand {
            id
            name
          }
        }
      }
    `;

    const res = await query({ query: GET_PRODUCTS });
    expect(res.errors).toBe(undefined);
    expect(res.data.products).toEqual(getAllProductsGraphqlResponse);
  });

  it('fetches one product', async () => {
    const productAPI: ProductAPI = new ProductAPI();
    const getProductStub = (): Promise<ProductView> =>
      Promise.resolve(getProductAPIResponse);
    productAPI.getProduct = jest.fn(getProductStub);

    const { query } = testServer(() => ({ productAPI }));

    const GET_PRODUCT = gql`
      query getProduct {
        product(id: "3f8442a0-916c-11eb-babe-2701447bb9d3") {
          id
          name
          slug
          sku
          brand {
            id
            name
          }
        }
      }
    `;

    const res = await query({ query: GET_PRODUCT });
    expect(res.errors).toBe(undefined);
    expect(res.data.product).toEqual(getProductGraphqlResponse);
  });

  it('creates product', async () => {
    const productAPI: ProductAPI = new ProductAPI();
    const createProductStub = (): Promise<ProductView> =>
      Promise.resolve(createProductAPIResponse);
    productAPI.createProduct = jest.fn(createProductStub);

    const { query } = testServer(() => ({ productAPI }));

    const CREATE_PRODUCT = gql`
      mutation createProduct {
        createProduct(
          product: {
            name: "Bag"
            slug: "bag"
            sku: "3f8442a0-746c-52eb-babe-4201447bb9d3"
            brandId: "123e4567-e89b-12d3-a456-556642440000"
          }
        ) {
          id
          name
          slug
          sku
        }
      }
    `;

    const res = await query({ query: CREATE_PRODUCT });
    expect(res.errors).toBe(undefined);
    expect(res.data.createProduct).toEqual(createProductGraphqlResponse);
  });

  it('update product', async () => {
    const productAPI: ProductAPI = new ProductAPI();
    const updateProductStub = (): Promise<ProductView> =>
      Promise.resolve(updateProductAPIResponse);
    productAPI.updateProduct = jest.fn(updateProductStub);

    const { query } = testServer(() => ({ productAPI }));

    const UPDATE_PRODUCT = gql`
      mutation updateProduct {
        updateProduct(
          id: "3f8442a0-916c-11eb-babe-2701447bb9d3"
          product: { name: "Bag" }
        ) {
          id
          name
          slug
          sku
        }
      }
    `;

    const res = await query({ query: UPDATE_PRODUCT });
    expect(res.errors).toBe(undefined);
    expect(res.data.updateProduct).toEqual(updateProductGraphqlResponse);
  });
});
