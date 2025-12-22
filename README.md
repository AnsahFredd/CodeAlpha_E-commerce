# ShopHub - Modern E-Commerce Store

ShopHub is a full-stack e-commerce application built with a focus on performance, responsiveness, and user experience. It features a robust Node.js/Express backend and a dynamic React/Vite frontend.

---

## 🚀 Key Features

- **🛍️ Complete Shopping Flow**: Browse products, search with filters, manage cart, and place orders.
- **🔐 Secure Authentication**: Integrated Firebase Authentication with a custom MongoDB user bridge for persistence.
- **📱 Responsive Design**: Fully optimized for mobile, tablet (Surface Pro), and desktop devices.
- **👤 Profile Management**: Persistent user profiles including address and contact information.
- **❤️ Wishlist**: Save favorite items for later.
- **📦 Order Tracking**: View previous orders and status updates.

---

## 🛠️ Technology Stack

### Frontend

- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Routing**: React Router Dom 7

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: Firebase Admin SDK & JWT
- **Validation**: Express Validator & Zod

---

## 📂 Project Structure

```text
CodeAlpha_e-commerce-store/
├── frontend/                # React client application
│   ├── src/
│   │   ├── components/      # Shared UI components
│   │   ├── context/         # Auth, Cart, and Product contexts
│   │   ├── pages/           # Page-level modules (Home, Product, etc.)
│   │   └── services/        # API communication layers
│   └── vercel.json          # Deployment configuration
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API endpoints
│   │   └── validators/      # Middleware for data integrity
│   └── .env.example         # Template for environment variables
└── README.md                # This file
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local instance or Atlas)
- Firebase Project (for Auth)

### 1. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and Firebase credentials
npm run dev
```

### 2. Setup Frontend

```bash
cd frontend
npm install
# Update .env with VITE_API_URL (e.g., http://localhost:5000/api)
npm run dev
```

---

## 🚢 Deployment (Vercel)

The project is configured for easy deployment on Vercel.

- The `vercel.json` ensures that client-side routing works correctly (preventing 404s on refresh).
- Ensure all environment variables are set in the Vercel dashboard.

---

## 👨‍💻 Developed by

Project developed as part of the **CodeAlpha Internship**. Focused on implementing persistent profile saving, responsive grid layouts, and modular architecture.
