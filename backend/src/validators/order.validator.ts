import { body } from 'express-validator';

export const createOrderValidator = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),

  body('items.*.product')
    .notEmpty()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Invalid product ID'),

  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),

  body('shippingInfo.fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),

  body('shippingInfo.email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),

  body('shippingInfo.phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),

  body('shippingInfo.address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),

  body('shippingInfo.city').trim().notEmpty().withMessage('City is required'),

  body('shippingInfo.state').trim().notEmpty().withMessage('State is required'),

  body('shippingInfo.zipCode')
    .trim()
    .notEmpty()
    .withMessage('ZIP code is required'),

  body('shippingInfo.country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),

  body('paymentInfo.method')
    .notEmpty()
    .withMessage('Payment method is required')
    .isIn(['card', 'paypal'])
    .withMessage('Invalid payment method'),

  body('subtotal')
    .isFloat({ min: 0 })
    .withMessage('Subtotal must be a positive number'),

  body('tax').isFloat({ min: 0 }).withMessage('Tax must be a positive number'),

  body('shipping')
    .isFloat({ min: 0 })
    .withMessage('Shipping must be a positive number'),

  body('total')
    .isFloat({ min: 0 })
    .withMessage('Total must be a positive number'),
];
