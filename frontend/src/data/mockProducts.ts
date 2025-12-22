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

  // Sports Category
  {
    id: '13',
    name: 'Yoga Mat',
    description:
      'Non-slip exercise yoga mat with carrying strap. Perfect for yoga, pilates, and floor exercises.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: 'Sports',
    stock: 60,
  },
  {
    id: '14',
    name: 'Dumbbell Set',
    description:
      'Adjustable dumbbell set for home workouts. Durable and comfortable grip.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500',
    category: 'Sports',
    stock: 25,
  },
  {
    id: '15',
    name: 'Running Shoes',
    description:
      'Lightweight and breathable running shoes with cushioned sole. Ideal for daily runs and training.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Sports',
    stock: 40,
  },

  // Beauty Category
  {
    id: '16',
    name: 'Skincare Set',
    description:
      'Complete daily skincare routine set including cleanser, toner, and moisturizer.',
    price: 65.0,
    image: 'https://images.unsplash.com/photo-1556228552-523c03539dad?w=500',
    category: 'Beauty',
    stock: 55,
  },
  {
    id: '17',
    name: 'Matte Lipstick',
    description:
      'Long-lasting matte lipstick in various shades. Hydrating formula for all-day wear.',
    price: 18.5,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500',
    category: 'Beauty',
    stock: 100,
  },
  {
    id: '18',
    name: 'Luxury Perfume',
    description:
      'Elegant floral fragrance with notes of jasmine and rose. Long-lasting scent.',
    price: 120.0,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
    category: 'Beauty',
    stock: 30,
  },
];
