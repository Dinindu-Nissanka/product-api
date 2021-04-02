import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import { ProductAPI } from './datasource';
import { loggerPlugin } from './plugins/logger';
import Logger from './util/logger';

const app = express();
const port = 8000;

const env = process.env.NODE_ENV;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    productAPI: new ProductAPI(),
  }),
  plugins: [loggerPlugin],
  playground: env === 'development',
});

server.applyMiddleware({
  app,
});

app.listen(port, () => {
  Logger.info(`Server is listening at http://localhost:${port}`);
});
