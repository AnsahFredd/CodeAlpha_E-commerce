import { Router } from 'express';
import {
  getProducts,
  getProduct,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { protect, admin } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  createProductValidator,
  updateProductValidator,
} from '../validators/product.validator';

const router = Router();

// Public routes
router.get('/', getProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProduct);

// Admin routes
router.post(
  '/',
  protect,
  admin,
  validate(createProductValidator),
  createProduct
);
router.put(
  '/:id',
  protect,
  admin,
  validate(updateProductValidator),
  updateProduct
);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
