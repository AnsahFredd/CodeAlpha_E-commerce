import type { Product } from '../types/cart';

/**
 * Mock Product Data
 * This simulates products from a database/API
 * In a real app, this would come from your backend
 */
export const mockProducts: Product[] = [
  // Electronics Category
  {
    id: '1',
    name: 'Wireless Headphones',
    description:
      'Premium noise-cancelling wireless headphones with 30-hour battery life. Perfect for music lovers and professionals.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 45,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description:
      'Feature-rich smartwatch with health tracking, GPS, and water resistance. Stay connected on the go.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 30,
  },
  {
    id: '3',
    name: 'Laptop Stand',
    description:
      'Ergonomic aluminum laptop stand. Adjustable height and angle for comfortable working.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    category: 'Electronics',
    stock: 60,
  },
  {
    id: '4',
    name: 'Wireless Mouse',
    description:
      'Precision wireless mouse with ergonomic design. Long battery life and smooth tracking.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    category: 'Electronics',
    stock: 100,
  },

  // Clothing Category
  {
    id: '5',
    name: 'Classic T-Shirt',
    description:
      '100% cotton classic fit t-shirt. Comfortable and breathable for everyday wear.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'Clothing',
    stock: 150,
  },
  {
    id: '6',
    name: 'Denim Jeans',
    description:
      'Premium denim jeans with modern fit. Durable and stylish for any occasion.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    category: 'Clothing',
    stock: 80,
  },
  {
    id: '7',
    name: 'Hoodie',
    description:
      'Cozy fleece hoodie with kangaroo pocket. Perfect for casual comfort.',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    category: 'Clothing',
    stock: 90,
  },

  // Home & Living Category
  {
    id: '8',
    name: 'Coffee Maker',
    description:
      'Programmable coffee maker with thermal carafe. Brew perfect coffee every morning.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    category: 'Home & Living',
    stock: 40,
  },
  {
    id: '9',
    name: 'Desk Lamp',
    description:
      'LED desk lamp with adjustable brightness and color temperature. Eye-friendly lighting.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    category: 'Home & Living',
    stock: 70,
  },
  {
    id: '10',
    name: 'Throw Pillow Set',
    description:
      'Set of 2 decorative throw pillows. Soft and stylish accent for your living space.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500',
    category: 'Home & Living',
    stock: 120,
  },

  // Books Category
  {
    id: '11',
    name: 'JavaScript Guide',
    description:
      'Comprehensive guide to modern JavaScript. Perfect for beginners and intermediate developers.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500',
    category: 'Books',
    stock: 50,
  },
  {
    id: '12',
    name: 'Design Thinking',
    description:
      'Learn the principles of design thinking and innovation. Practical examples included.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    category: 'Books',
    stock: 35,
  },
];
