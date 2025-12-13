/**
 * Navigation Items Configuration - Updated with categories
 */

import { ROUTES } from '../../../constants';

/**
 * Main navigation items (category menu)
 * Displayed in the bottom navigation bar
 */
export const NAV_ITEMS = [
  { label: 'All Products', path: ROUTES.PRODUCTS },
  { label: 'Fashion', path: '/category/clothing' },
  { label: 'Electronics', path: '/category/electronics' },
  { label: 'Home & Living', path: '/category/home-living' },
  { label: 'Sports', path: '/category/sports' },
  { label: 'Beauty', path: '/category/beauty' },
];

/**
 * User-specific navigation items
 * Not currently used but kept for future reference
 */
export const USER_NAV_ITEMS = [
  {
    label: 'Cart',
    path: ROUTES.CART,
    icons: 'shopping_cart',
    requiresAuth: false,
  },
  {
    label: 'Orders',
    path: ROUTES.ORDERS,
    icons: 'receipt_long',
    requiresAuth: true,
  },
];
