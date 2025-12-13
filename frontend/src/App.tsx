import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Products from './pages/product/Products';
import ProductDetailsPage from './pages/productDetails/ProductDetailsPage';
import CardPage from './pages/cart/CardPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderConfirmationPage from './pages/orderConfirmation/OrderConfirmationPage';
import UserProfilePage from './pages/profile/UserProfilePage';
import OrderSuccess from './pages/order/OrderSuccess';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ROUTES } from './constants/';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.PRODUCTS} element={<Products />} />
        <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetailsPage />} />

        {/* Protected Routes */}
        <Route
          path={ROUTES.CART}
          element={
            <ProtectedRoute>
              <CardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.CHECKOUT}
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation/:orderId"
          element={
            <ProtectedRoute>
              <OrderConfirmationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ORDERS}
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
