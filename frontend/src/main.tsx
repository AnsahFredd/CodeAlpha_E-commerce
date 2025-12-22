import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App.tsx';
import Layout from './components/common/Layout.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { CartProvider } from './context/CartProvider.tsx';
import { ProductProvider } from './context/ProductProvider.tsx';
import { WishlistProvider } from './context/WishlistContext.tsx';

/**
 * Main Application Entry Point
 *
 * Provider Hierarchy:
 * 1. BrowserRouter - Enables routing throughout the app
 * 2. AuthProvider - Manages user authentication state
 * 3. ProductProvider - Manages product catalog and search
 * 4. CartProvider - Manages shopping cart state
 * 5. WishlistProvider - Manages user wishlist
 *
 * This structure ensures all components have access to auth, products, cart, and wishlist
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <Layout>
                <App />
              </Layout>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
