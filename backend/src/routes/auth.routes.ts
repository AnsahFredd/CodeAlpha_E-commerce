import { Router } from 'express';
import passport from 'passport';
import {
  register,
  login,
  getMe,
  updateProfile,
  refreshToken,
  logout,
  socialCallback,
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
router.post('/login', firebaseLogin);

// Social Auth Routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  socialCallback
);

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: '/login',
  }),
  socialCallback
);

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
