import { body } from 'express-validator';

export const createProductValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 100 })
    .withMessage('Product name cannot exceed 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0, max: 999999 })
    .withMessage('Price must be between 0 and 999999'),

  body('image')
    .trim()
    .notEmpty()
    .withMessage('Product image is required')
    .isURL()
    .withMessage('Image must be a valid URL'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Electronics', 'Clothing', 'Home & Living', 'Books', 'Other'])
    .withMessage('Please select a valid category'),

  body('stock')
    .notEmpty()
    .withMessage('Stock quantity is required')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
];

export const updateProductValidator = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Product name cannot exceed 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),

  body('price')
    .optional()
    .isFloat({ min: 0, max: 999999 })
    .withMessage('Price must be between 0 and 999999'),

  body('image')
    .optional()
    .trim()
    .isURL()
    .withMessage('Image must be a valid URL'),

  body('category')
    .optional()
    .trim()
    .isIn(['Electronics', 'Clothing', 'Home & Living', 'Books', 'Other'])
    .withMessage('Please select a valid category'),

  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
];
