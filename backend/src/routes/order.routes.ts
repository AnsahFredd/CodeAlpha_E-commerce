import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  cancelOrder,
  updateOrderStatus,
} from '../controllers/order.controller';
import { protect, admin } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createOrderValidator } from '../validators/order.validator';

const router = Router();

// All order routes are protected
router.use(protect);

router.post('/', validate(createOrderValidator), createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);

// Admin only
router.put('/:id/status', admin, updateOrderStatus);

export default router;
