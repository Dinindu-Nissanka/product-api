import winston from 'winston';
import config from 'config';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}] ${info.message}`
  )
);

const transports = [
  new winston.transports.Console({
    silent: process.env.NODE_ENV === 'test',
  }),
  new winston.transports.File({
    filename: `logs/${config.get('logger.outputFilePrefix')}.error.log`,
    level: 'error',
  }),
  new winston.transports.File({
    filename: `logs/${config.get('logger.outputFilePrefix')}.log`,
  }),
];

/**
 * Logger for tha application
 */
const Logger = winston.createLogger({
  level: config.get('logger.level'),
  levels,
  format,
  transports,
});

export default Logger;
