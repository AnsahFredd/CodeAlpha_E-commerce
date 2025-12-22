import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts as useProductsContext } from 'src/context/ProductContext';

export const useProductsPage = () => {
  const { products, searchProducts, getProductsByCategory, getAllCategories } =
    useProductsContext();
  const { category: categorySlug } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const categoryMapping: Record<string, string> = useMemo(
    () => ({
      clothing: 'Clothing',
      electronics: 'Electronics',
      'home-living': 'Home & Living',
      sports: 'Sports',
      beauty: 'Beauty',
      books: 'Books',
    }),
    []
  );

  const selectedCategory = useMemo(() => {
    return categorySlug ? categoryMapping[categorySlug] || 'All' : 'All';
  }, [categorySlug, categoryMapping]);

  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      navigate('/products');
      return;
    }
    const slug = Object.keys(categoryMapping).find(
      (key) => categoryMapping[key] === category
    );
    if (slug) {
      navigate(`/products/${slug}`);
    } else {
      navigate(`/products/${category.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  const filteredProducts = useMemo(() => {
    if (searchQuery.trim()) {
      return searchProducts(searchQuery);
    }
    if (selectedCategory !== 'All') {
      return getProductsByCategory(selectedCategory);
    }
    return products;
  }, [
    searchQuery,
    selectedCategory,
    products,
    searchProducts,
    getProductsByCategory,
  ]);

  const categories = useMemo(() => {
    return ['All', ...getAllCategories()];
  }, [getAllCategories]);

  const clearFilters = () => {
    setSearchQuery('');
    navigate('/products');
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    handleCategoryChange,
    filteredProducts,
    categories,
    clearFilters,
  };
};
