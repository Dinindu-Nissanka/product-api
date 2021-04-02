import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server';
import typeDefs from '../../src/schema';
import resolvers from '../../src/resolvers';

export default function testServer(dataSources: any): ApolloServerTestClient {
  return createTestClient(
    new ApolloServer({ typeDefs, resolvers, dataSources })
  );
}
