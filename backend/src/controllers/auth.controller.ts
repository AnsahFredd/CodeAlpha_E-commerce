import { Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { AppError } from '../middleware/errorHandler';
import jwt from 'jsonwebtoken';
import { auth as firebaseAuth } from '../config/firebase';
/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new AppError('User already exists with this email', 400);
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate tokens
    const token = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json(
      ApiResponse.success('User registered successfully', {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
        refreshToken,
      })
    );
  }
);

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  // Check if user exists and get password
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  // Check password
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  // Generate tokens
  const token = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();

  // Save refresh token to database
  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json(
    ApiResponse.success('Login successful', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
      refreshToken,
    })
  );
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.status(200).json(
    ApiResponse.success('User profile retrieved', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
        createdAt: user.createdAt,
      },
    })
  );
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { name, email, phone, address, city, state, zipCode } = req.body;

    const user = await User.findById(req.user?._id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        throw new AppError('Email already in use', 400);
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (city !== undefined) user.city = city;
    if (state !== undefined) user.state = state;
    if (zipCode !== undefined) user.zipCode = zipCode;

    await user.save();

    res.status(200).json(
      ApiResponse.success('Profile updated successfully', {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
          city: user.city,
          state: user.state,
          zipCode: user.zipCode,
        },
      })
    );
  }
);

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh
 * @access  Public
 */
export const refreshToken = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError('Refresh token is required', 400);
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET || 'fallback_refresh_secret'
      ) as { id: string };

      // Find user and check if refresh token matches
      const user = await User.findById(decoded.id).select('+refreshToken');

      if (!user || user.refreshToken !== refreshToken) {
        throw new AppError('Invalid refresh token', 401);
      }

      // Generate new tokens
      const newToken = user.generateAuthToken();
      const newRefreshToken = user.generateRefreshToken();

      // Update refresh token in database
      user.refreshToken = newRefreshToken;
      await user.save();

      res.status(200).json(
        ApiResponse.success('Token refreshed successfully', {
          token: newToken,
          refreshToken: newRefreshToken,
        })
      );
    } catch (error) {
      throw new AppError('Invalid or expired refresh token', 401);
    }
  }
);

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Clear refresh token
  user.refreshToken = undefined;
  await user.save();

  res.status(200).json(ApiResponse.success('Logged out successfully'));
});

/**
 * @desc    Handle Firebase login/signup
 * @route   POST /api/auth/firebase-login
 * @access  Public
 */
export const firebaseLogin = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { idToken } = req.body;

    if (!idToken) {
      throw new AppError('Firebase ID token is required', 400);
    }

    try {
      // Verify Firebase ID token
      const decodedToken = await firebaseAuth.verifyIdToken(idToken);
      const { email, name, picture, uid } = decodedToken;

      if (!email) {
        throw new AppError('Email not associated with Firebase account', 400);
      }

      // Check if user exists in MongoDB
      let user = await User.findOne({ email });

      if (user) {
        // If user exists, update their profile picture and name if they've changed
        if (name && user.name !== name) user.name = name;
        // Optionally update other fields
      } else {
        // Create new user
        user = await User.create({
          name: name || 'User',
          email,
          password: 'firebase-auth-' + uid + '-' + Date.now(), // Placeholder password
          role: 'user',
        });
      }

      // Generate app-specific tokens
      const token = user.generateAuthToken();
      const refreshToken = user.generateRefreshToken();

      // Save refresh token
      user.refreshToken = refreshToken;
      await user.save();

      res.status(200).json(
        ApiResponse.success('Firebase login successful', {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: picture,
          },
          token,
          refreshToken,
        })
      );
    } catch (error: any) {
      console.error('Firebase Auth Error:', error);
      throw new AppError(
        'Firebase authentication failed: ' + error.message,
        401
      );
    }
  }
);
