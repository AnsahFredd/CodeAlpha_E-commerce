import { Request, Response } from 'express';
import Product from '../models/Product';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { AppError } from '../middleware/errorHandler';

/**
 * @desc    Get all products with filtering, sorting, and pagination
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const skip = (page - 1) * limit;

  // Build query
  const query: any = {};

  // Filter by category
  if (req.query.category) {
    query.category = req.query.category;
  }

  // Filter by price range
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) {
      query.price.$gte = parseFloat(req.query.minPrice as string);
    }
    if (req.query.maxPrice) {
      query.price.$lte = parseFloat(req.query.maxPrice as string);
    }
  }

  // Search by name or description
  if (req.query.search) {
    query.$text = { $search: req.query.search as string };
  }

  // Sort
  let sort: any = { createdAt: -1 }; // Default: newest first
  if (req.query.sort) {
    switch (req.query.sort) {
      case 'price-asc':
        sort = { price: 1 };
        break;
      case 'price-desc':
        sort = { price: -1 };
        break;
      case 'name-asc':
        sort = { name: 1 };
        break;
      case 'name-desc':
        sort = { name: -1 };
        break;
    }
  }

  // Execute query
  const products = await Product.find(query).sort(sort).skip(skip).limit(limit);

  const total = await Product.countDocuments(query);

  res.status(200).json(
    ApiResponse.success('Products retrieved successfully', {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  );
});

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res
    .status(200)
    .json(ApiResponse.success('Product retrieved successfully', { product }));
});

/**
 * @desc    Get products by category
 * @route   GET /api/products/category/:category
 * @access  Public
 */
export const getProductsByCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { category } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const products = await Product.find({ category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments({ category });

    res.status(200).json(
      ApiResponse.success('Products retrieved successfully', {
        products,
        category,
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
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.create(req.body);

    res
      .status(201)
      .json(ApiResponse.success('Product created successfully', { product }));
  }
);

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res
      .status(200)
      .json(ApiResponse.success('Product updated successfully', { product }));
  }
);

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.status(200).json(ApiResponse.success('Product deleted successfully'));
  }
);
