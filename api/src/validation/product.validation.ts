import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import ValidationException from '../exceptions/ValidationException';

/**
 * Create product validation rules
 * @returns
 */
export const productCreateValidationRules = (): any => {
  return [
    body('name').exists(),
    body('slug').exists(),
    body('sku').exists(),
    body('brandId').exists(),
  ];
};

/**
 * Update product validation rules
 * @returns
 */
export const productUpdateValidationRules = (): any => {
  return [body().exists(), param('id').exists().isUUID()];
};

/**
 * Fetch product validation rules
 * @returns
 */
export const productFetchValidationRules = (): any => {
  return [param('id').exists().isUUID()];
};

/**
 * Delete product validation rules
 * @returns
 */
export const productDeleteValidationRules = (): any => {
  return [param('id').exists().isUUID()];
};

export const productValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  const errors: any[] = [];
  result.array().map((error) => errors.push({ [error.param]: error.msg }));

  return next(new ValidationException(errors));
};
