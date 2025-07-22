import { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './ShopPage.module.css';
import Card from '../components/ui/Card';
import { useProducts } from '../context/ProductContext';
import { DISPLAY_LABELS } from '../utils/categoryMap';

function ShopPage() {
  const { products, loading, error, categories } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // کنترل فیلترها
  const [selectedCats, setSelectedCats] = useState(new Set());
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  /* ---------------- Initialize filters from URL ---------------- */
  useEffect(() => {
    const catsParam = searchParams.get('cats');
    if (catsParam) {
      const incoming = catsParam.split(',').map((s) => s.trim()).filter(Boolean);
      setSelectedCats(new Set(incoming));
    } else {
      setSelectedCats(new Set());
    }

    const min = searchParams.get('min');
    const max = searchParams.get('max');
    if (min !== null) setMinPrice(min);
    if (max !== null) setMaxPrice(max);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- Update URL when filters change ---------------- */
  const syncUrl = useCallback((catsSet, min, max) => {
    const params = {};
    if (catsSet && catsSet.size > 0) params.cats = Array.from(catsSet).join(',');
    if (min !== '' && !isNaN(min)) params.min = min;
    if (max !== '' && !isNaN(max)) params.max = max;
    setSearchParams(params, { replace: true });
  }, [setSearchParams]);

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
      if (selectedCats.size > 0 && !selectedCats.has(p.category)) return false;
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
        <span aria-hidden="true"> → </span>
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
              id={p.id}
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
