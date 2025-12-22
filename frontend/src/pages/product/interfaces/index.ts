import type { Product } from 'src/types/cart';

export interface ProductFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export interface ProductListProps {
  products: Product[];
  isInCart: (id: string) => boolean;
  getItemQuantity: (id: string) => number;
  isInWishlist: (id: string) => boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onClearFilters: () => void;
}
