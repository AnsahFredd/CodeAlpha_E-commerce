import { Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { AppError } from '../middleware/errorHandler';

/**
 * @desc    Get user's cart
 * @route   GET /api/cart
 * @access  Private
 */
export const getCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  let cart = await Cart.findOne({ user: req.user?._id }).populate(
    'items.product'
  );

  if (!cart) {
    // Create empty cart if doesn't exist
    cart = await Cart.create({
      user: req.user?._id,
      items: [],
    });
  }

  res
    .status(200)
    .json(ApiResponse.success('Cart retrieved successfully', { cart }));
});

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Private
 */
export const addToCart = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { productId, quantity = 1 } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Check stock
    if (product.stock < quantity) {
      throw new AppError('Insufficient stock', 400);
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      cart = await Cart.create({
        user: req.user?._id,
        items: [],
      });
    }

    // Check if item already in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      if (product.stock < newQuantity) {
        throw new AppError('Insufficient stock', 400);
      }
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item
      cart.items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json(ApiResponse.success('Item added to cart', { cart }));
  }
);

/**
 * @desc    Update cart item quantity
 * @route   PUT /api/cart/:productId
 * @access  Private
 */
export const updateCartItem = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      throw new AppError('Quantity must be at least 1', 400);
    }

    const cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      throw new AppError('Cart not found', 404);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      throw new AppError('Item not found in cart', 404);
    }

    // Check stock
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    if (product.stock < quantity) {
      throw new AppError('Insufficient stock', 400);
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate('items.product');

    res
      .status(200)
      .json(ApiResponse.success('Cart updated successfully', { cart }));
  }
);

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:productId
 * @access  Private
 */
export const removeFromCart = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      throw new AppError('Cart not found', 404);
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate('items.product');

    res
      .status(200)
      .json(ApiResponse.success('Item removed from cart', { cart }));
  }
);

/**
 * @desc    Clear cart
 * @route   DELETE /api/cart
 * @access  Private
 */
export const clearCart = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      throw new AppError('Cart not found', 404);
    }

    cart.items = [];
    await cart.save();

    res
      .status(200)
      .json(ApiResponse.success('Cart cleared successfully', { cart }));
  }
);
