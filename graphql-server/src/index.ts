import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import config from 'config';
import typeDefs from './schema';
import resolvers from './resolvers';
import { ProductAPI } from './datasource';
import { loggerPlugin } from './plugins/logger';
import Logger from './util/logger';

const app = express();
const port = config.get('port');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    productAPI: new ProductAPI(),
  }),
  plugins: [loggerPlugin],
});

server.applyMiddleware({
  app,
  path: '/api/v2/products',
});

app.listen(port, () => {
  Logger.info(`Server is listening at http://localhost:${port}`);
});
