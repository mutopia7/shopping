import { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './ShopPage.module.css';
import Card from '../components/ui/Card';
import { mapApiCategoryToDisplay, DISPLAY_LABELS } from '../utils/categoryMap';

function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Products from API
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // Controlled filters
  const [selectedCats, setSelectedCats] = useState(new Set());
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  /* ---------------- Fetch products ---------------- */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        if (cancelled) return;

        // Convert data to card format
        const normalized = data.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          // Actual API Category
          apiCategory: p.category,
          // Our display category
          category: mapApiCategoryToDisplay(p.category),
        }));

        setProducts(normalized);
        setError(null);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Error loading products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------------- Categories from products ---------------- */
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return Array.from(set);
  }, [products]);

  /* ---------------- Initialize filters from URL ---------------- */
  useEffect(() => {
    // cats=men,women
    const catsParam = searchParams.get('cats');
    if (catsParam) {
      const incoming = catsParam.split(',').map((s) => s.trim()).filter(Boolean);
      setSelectedCats(new Set(incoming));
    } else {
      setSelectedCats(new Set()); // empty = همه
    }

    const min = searchParams.get('min');
    const max = searchParams.get('max');
    if (min !== null) setMinPrice(min);
    if (max !== null) setMaxPrice(max);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only the first time; we don't want the user to override it again when they change the filter.

  /* ---------------- Update URL when filters change ---------------- */
  const syncUrl = useCallback((catsSet, min, max) => {
    const params = {};
    if (catsSet && catsSet.size > 0) params.cats = Array.from(catsSet).join(',');
    if (min !== '' && !isNaN(min)) params.min = min;
    if (max !== '' && !isNaN(max)) params.max = max;
    setSearchParams(params, { replace: true });
  }, [setSearchParams]);

  // Update URL every time the filter changes.
  useEffect(() => {
    syncUrl(selectedCats, minPrice, maxPrice);
  }, [selectedCats, minPrice, maxPrice, syncUrl]);

  /* ---------------- Toggle category ---------------- */
  const toggleCategory = (cat) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  /* ---------------- Filter products ---------------- */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCats.size > 0 && !selectedCats.has(p.category)) return false;
      // Price
      const price = Number(p.price);
      const minOk = minPrice === '' ? true : price >= Number(minPrice);
      const maxOk = maxPrice === '' ? true : price <= Number(maxPrice);
      return minOk && maxOk;
    });
  }, [products, selectedCats, minPrice, maxPrice]);

  /* ---------------- UI ---------------- */
  return (
    <section className={styles.shopPage}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <span aria-hidden="true">→</span>
        <span className={styles.currentCrumb}>Shop</span>
      </nav>

      <div className={styles.shopLayout}>
        {/* Sidebar Filters */}
        <aside className={styles.filters} aria-labelledby="filters-heading">
          <h2 id="filters-heading" className={styles.filtersHeading}>
            Filters
          </h2>

          {/* Category filter */}
          <fieldset className={styles.filterGroup}>
            <legend className={styles.borderBottom}>Category</legend>
            {categories.length === 0 && !loading ? (
              <p className={styles.emptyCats}>No categories.</p>
            ) : (
              categories.map((cat) => (
                <label key={cat} className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    checked={selectedCats.has(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <span>{DISPLAY_LABELS[cat] ?? cat}</span>
                </label>
              ))
            )}
          </fieldset>

          {/* Price filter */}
          <fieldset className={styles.filterGroup}>
            <legend className={styles.borderBottom}>Price</legend>
            <div className={styles.priceInputs}>
              <label>
                Min
                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                />
              </label>
              <label>
                Max
                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="1500"
                />
              </label>
            </div>
          </fieldset>
        </aside>

        {/* Product grid */}
        <div className={styles.products}>
          {loading && <p>Loading products…</p>}
          {error && !loading && <p className={styles.errorMsg}>{error}</p>}
          {!loading && !error && filteredProducts.length === 0 && (
            <p className={styles.emptyState}>No products were found matching the filter.</p>
          )}
          {!loading && !error && filteredProducts.map((p) => (
            <Card
              key={p.id}
              image={p.image}
              title={p.title}
              price={p.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopPage;
