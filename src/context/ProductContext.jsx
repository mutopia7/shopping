import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { mapApiCategoryToDisplay } from '../utils/categoryMap';
import { slugify } from '../utils/slugify';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();

      const normalized = data.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.image,
        description: p.description,
        apiCategory: p.category,
        category: mapApiCategoryToDisplay(p.category),
        slug: slugify(p.title),
        rating: p.rating?.rate ?? null,
        count: p.rating?.count ?? null,
      }));

      setProducts(normalized);
    } catch (err) {
      setError(err.message || 'Error loading products');
    } finally {
      setLoading(false);
    }
  }, []);

  // fetch once
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // index by id برای lookup سریع
  const productsById = useMemo(() => {
    const m = new Map();
    for (const p of products) m.set(String(p.id), p);
    return m;
  }, [products]);

  // دسته‌های یکتا
  const categories = useMemo(() => {
    const s = new Set(products.map(p => p.category));
    return Array.from(s);
  }, [products]);

  // گرفتن محصول بر اساس id (string یا number)
  const getProductById = useCallback((id) => {
    return productsById.get(String(id)) || null;
  }, [productsById]);

  const value = {
    products,
    loading,
    error,
    refresh: fetchProducts,
    categories,
    getProductById,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

// هوک مصرف‌کننده
export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within a ProductProvider');
  return ctx;
}
