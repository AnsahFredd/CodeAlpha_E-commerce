import { ROUTES } from "../../../constants";

export const NAV_ITEMS = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Products", path: ROUTES.PRODUCTS },
];

export const USER_NAV_ITEMS = [
  {
    label: "Cart",
    path: ROUTES.CART,
    icons: "shopping_cart",
    requiresAuth: true,
  },
  {
    label: "Orders",
    path: ROUTES.ORDERS,
    icons: "receipt_long",
    requiresAuth: true,
  },
  {
    label: "Profile",
    path: "/profile", // Assuming a profile route or fallback
    icons: "user",
    requiresAuth: true,
  },
];
