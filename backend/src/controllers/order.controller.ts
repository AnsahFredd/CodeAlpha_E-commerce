import { Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import Cart from '../models/Cart';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { AppError } from '../middleware/errorHandler';

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { items, shippingInfo, paymentInfo, subtotal, tax, shipping, total } =
      req.body;

    // Validate stock for all items
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new AppError(`Product ${item.product} not found`, 404);
      }
      if (product.stock < item.quantity) {
        throw new AppError(`Insufficient stock for ${product.name}`, 400);
      }
    }

    // Fetch product details for order items
    const orderItems = await Promise.all(
      items.map(async (item: any) => {
        const product = await Product.findById(item.product);
        return {
          product: product!._id,
          name: product!.name,
          price: product!.price,
          image: product!.image,
          quantity: item.quantity,
        };
      })
    );

    // Create order
    const order = await Order.create({
      user: req.user?._id,
      items: orderItems,
      shippingInfo,
      paymentInfo: {
        method: paymentInfo.method,
        status: 'pending',
      },
      subtotal,
      tax,
      shipping,
      total,
      status: 'pending',
    });

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // Clear user's cart
    await Cart.findOneAndUpdate(
      { user: req.user?._id },
      { items: [], totalItems: 0, totalPrice: 0 }
    );

    res
      .status(201)
      .json(ApiResponse.success('Order created successfully', { order }));
  }
);

/**
 * @desc    Get user's orders
 * @route   GET /api/orders
 * @access  Private
 */
export const getOrders = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.user?._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('items.product');

    const total = await Order.countDocuments({ user: req.user?._id });

    res.status(200).json(
      ApiResponse.success('Orders retrieved successfully', {
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      })
    );
  }
);

/**
 * @desc    Get single order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrder = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const order = await Order.findById(req.params.id).populate('items.product');

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    // Make sure user owns this order
    if (order.user.toString() !== req.user?._id.toString()) {
      throw new AppError('Not authorized to access this order', 403);
    }

    res
      .status(200)
      .json(ApiResponse.success('Order retrieved successfully', { order }));
  }
);

/**
 * @desc    Cancel order
 * @route   PUT /api/orders/:id/cancel
 * @access  Private
 */
export const cancelOrder = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    // Make sure user owns this order
    if (order.user.toString() !== req.user?._id.toString()) {
      throw new AppError('Not authorized to cancel this order', 403);
    }

    // Can only cancel pending or processing orders
    if (!['pending', 'processing'].includes(order.status)) {
      throw new AppError('Cannot cancel order in current status', 400);
    }

    order.status = 'cancelled';
    await order.save();

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }

    res
      .status(200)
      .json(ApiResponse.success('Order cancelled successfully', { order }));
  }
);

/**
 * @desc    Update order status (Admin only)
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
export const updateOrderStatus = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    const validStatuses = [
      'pending',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
    ];
    if (!validStatuses.includes(status)) {
      throw new AppError('Invalid order status', 400);
    }

    order.status = status;
    if (status === 'delivered') {
      order.paymentInfo.status = 'completed';
    }

    await order.save();

    res
      .status(200)
      .json(
        ApiResponse.success('Order status updated successfully', { order })
      );
  }
);
