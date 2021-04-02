import config from 'config';
import * as mysql from 'mysql2/promise';

export const initDatabase = async (): Promise<void> => {
  const { host, port, username, password, database } = config.get('db');
  const connection = await mysql.createConnection({
    host: host,
    user: username,
    password: password,
    port: port,
  });

  await connection.connect();
  await connection.query(`DROP DATABASE IF EXISTS ${database}`);
  await connection.query(`CREATE DATABASE ${database}`);
  connection.destroy();
};

export const dropDatabase = async (): Promise<void> => {
  const { host, port, username, password, database } = config.get('db');
  const connection = await mysql.createConnection({
    host: host,
    user: username,
    password: password,
    port: port,
  });

  await connection.connect();
  await connection.query(`DROP DATABASE IF EXISTS ${database}`);
  connection.destroy();
};
