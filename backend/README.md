# E-Commerce Backend API

A production-ready REST API for an e-commerce platform built with **Express.js**, **TypeScript**, and **MongoDB**.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Product Management**: Full CRUD operations with filtering, sorting, and pagination
- **Shopping Cart**: Persistent cart management with stock validation
- **Order Processing**: Complete order lifecycle with status tracking
- **Security**: Helmet, CORS, input validation, and password hashing
- **TypeScript**: Full type safety and IntelliSense support
- **Error Handling**: Centralized error handling with custom error classes
- **Database**: MongoDB with Mongoose ODM

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB**

   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Seed the database** (optional)

   ```bash
   npm run seed
   ```

6. **Start the server**

   ```bash
   # Development mode with hot reload
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Products

- `GET /api/products` - Get all products (with filters, sorting, pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart

- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:productId` - Update cart item (protected)
- `DELETE /api/cart/:productId` - Remove from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders

- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get single order (protected)
- `PUT /api/orders/:id/cancel` - Cancel order (protected)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## 🔐 Authentication

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📦 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts                 # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.ts    # Authentication logic
│   │   ├── product.controller.ts # Product operations
│   │   ├── cart.controller.ts    # Cart management
│   │   └── order.controller.ts   # Order processing
│   ├── middleware/
│   │   ├── auth.ts               # JWT authentication
│   │   ├── errorHandler.ts       # Error handling
│   │   └── validate.ts           # Validation middleware
│   ├── models/
│   │   ├── User.ts               # User schema
│   │   ├── Product.ts            # Product schema
│   │   ├── Cart.ts               # Cart schema
│   │   └── Order.ts              # Order schema
│   ├── routes/
│   │   ├── auth.routes.ts        # Auth routes
│   │   ├── product.routes.ts     # Product routes
│   │   ├── cart.routes.ts        # Cart routes
│   │   └── order.routes.ts       # Order routes
│   ├── utils/
│   │   ├── asyncHandler.ts       # Async error wrapper
│   │   ├── ApiResponse.ts        # Response formatter
│   │   └── seedDatabase.ts       # Database seeding
│   ├── validators/
│   │   ├── auth.validator.ts     # Auth validation
│   │   ├── product.validator.ts  # Product validation
│   │   └── order.validator.ts    # Order validation
│   └── server.ts                 # Entry point
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testing

Use tools like Postman, Thunder Client, or curl to test the API:

```bash
# Health check
curl http://localhost:5000/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Get products
curl http://localhost:5000/api/products
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed database with sample products

## 🌟 Features in Detail

### Product Filtering & Sorting

```
GET /api/products?category=Electronics&minPrice=50&maxPrice=300&sort=price-asc&page=1&limit=12
```

### Stock Management

- Automatic stock validation on cart operations
- Stock updates on order creation
- Stock restoration on order cancellation

### Order Status Tracking

- `pending` - Order created
- `processing` - Order being prepared
- `shipped` - Order shipped
- `delivered` - Order delivered
- `cancelled` - Order cancelled

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Helmet for security headers
- CORS configuration
- Input validation with express-validator
- MongoDB injection prevention

## 📝 License

ISC

## 👨‍💻 Author

CodeAlpha Internship Project
