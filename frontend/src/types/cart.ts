// Shopping Cart Types and Interfaces

/**
 * Represents a single product in the store
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

/**
 * Represents an item in the shopping cart
 * Extends Product with quantity information
 */
export interface CartItem extends Product {
  quantity: number; // How many of this item are in the cart
}

/**
 * Cart state structure
 */
export interface CartState {
  items: CartItem[]; // Array of all items in the cart
  totalItems: number; // Total count of items (sum of all quantities)
  totalPrice: number; // Total price of all items in cart
}
