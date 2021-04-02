import { Sequelize } from 'sequelize';
import config from 'config';
import Logger from '../util/logger';

const sequelize = new Sequelize(
  config.get('db.database'),
  config.get('db.username'),
  config.get('db.password'),
  {
    host: config.get('db.host'),
    port: config.get('db.port'),
    dialect: config.get('db.dialect'),
    logging: (msg) => Logger.debug(msg),
  }
);

export { Sequelize, sequelize };
