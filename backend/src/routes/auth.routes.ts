import { Router } from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  refreshToken,
  logout,
  firebaseLogin,
} from '../controllers/auth.controller';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  registerValidator,
  loginValidator,
  updateProfileValidator,
} from '../validators/auth.validator';

const router = Router();

// Public routes
router.post('/register', validate(registerValidator), register);
router.post('/login', validate(loginValidator), login);
router.post('/refresh', refreshToken);

// @route   POST /api/auth/firebase-login
router.post('/firebase-login', firebaseLogin);

// Protected routes
router.get('/me', protect, getMe);
router.put(
  '/profile',
  protect,
  validate(updateProfileValidator),
  updateProfile
);
router.post('/logout', protect, logout);

export default router;
