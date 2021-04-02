import express from 'express';
import { sequelize } from './db';
import Logger from './util/logger';
import morganMiddleware from './middleware/logger.middleware';
import { errorHandlerMiddleware } from './middleware/error.middleware';
import * as routes from './routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import { migrate } from '../src/db/migration';

const env = process.env.NODE_ENV || 'development';

sequelize
  .authenticate()
  .then(() => Logger.info('Successfully connected to the database'))
  .catch((error) => {
    Logger.error(`Error occurred while connecting to the database. ${error}`);
    throw 'error';
  });

if (env === 'development') {
  migrate();
}

const app = express();

app.use(express.json());
app.use(morganMiddleware);
routes.initRoutes(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandlerMiddleware);

export default app;
