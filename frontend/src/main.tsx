import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App.tsx';
import Navbar from './components/common/Navbar/Navbar.tsx';
import Footer from './components/common/Footer.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { CartProvider } from './context/CartProvider.tsx';
import { ProductProvider } from './context/ProductProvider.tsx';

/**
 * Main Application Entry Point
 *
 * Provider Hierarchy:
 * 1. BrowserRouter - Enables routing throughout the app
 * 2. AuthProvider - Manages user authentication state
 * 3. ProductProvider - Manages product catalog and search
 * 4. CartProvider - Manages shopping cart state
 *
 * This structure ensures all components have access to auth, products, and cart
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Navbar />
            <App />
            <Footer />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
