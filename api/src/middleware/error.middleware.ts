import HttpException from '../exceptions/HttpException';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to handle error responses
 * @param exception
 * @param request
 * @param response
 * @param next
 */
export const errorHandlerMiddleware = (
  exception: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const status = exception.statusCode || exception.status || 500;
  const message = exception.message || 'Something went wrong';

  response.status(status).send({
    status,
    message,
    error: exception.error,
  });
};
