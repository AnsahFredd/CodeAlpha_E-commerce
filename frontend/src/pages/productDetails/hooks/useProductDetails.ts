import { useState, useCallback } from 'react';
import { useCart } from 'src/context/CartContext';
import { useWishlist } from 'src/context/WishlistContext';
import type { Product } from 'src/types/cart';

export const useProductDetails = (product: Product | undefined) => {
  const { addToCart } = useCart();
  const {
    isInWishlist: checkIsInWishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addToCart(product, quantity);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [product, quantity, addToCart]);

  const increaseQuantity = useCallback(() => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  }, [product, quantity]);

  const decreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }, [quantity]);

  const toggleWishlist = useCallback(() => {
    if (!product) return;
    if (checkIsInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [product, checkIsInWishlist, removeFromWishlist, addToWishlist]);

  const isInWishlist = product ? checkIsInWishlist(product.id) : false;

  return {
    quantity,
    showSuccess,
    handleAddToCart,
    increaseQuantity,
    decreaseQuantity,
    toggleWishlist,
    isInWishlist,
  };
};
