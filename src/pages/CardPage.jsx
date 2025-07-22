import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './CardPage.module.css';
import { useProducts } from '../context/ProductContext';
import { DISPLAY_LABELS } from '../utils/categoryMap';
import { useCart } from '../context/CartContext';

function parseProductKey(productKey) {
  const [idPart, ...slugParts] = productKey.split('-');
  const id = Number(idPart);
  return { id, slug: slugParts.join('-') };
}

function CardPage() {
  const { addToCart } = useCart();

  const { productKey } = useParams();
  const { id } = parseProductKey(productKey);

  const { getProductById } = useProducts();
  const [product, setProduct] = useState(() => getProductById(id));
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState(null);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  
  const colorOptions = product?.colors ?? ['black', 'red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  const sizeOptions = product?.sizes ?? ['XS', 'S', 'M', 'L', 'XL'];

  useEffect(() => {
    if (product) {
      if (!selectedColor) setSelectedColor(colorOptions[0]);
      if (!selectedSize) setSelectedSize(sizeOptions[0]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error('Failed to load product');
        const data = await res.json();
        if (cancelled) return;
        const fetched = {
          id: data.id,
          title: data.title,
          price: data.price,
          image: data.image,
          description: data.description,
          apiCategory: data.category,
          category: data.category,
          colors: ['black', 'red', 'blue'],
          sizes: ['S', 'M', 'L'],
        };
        setProduct(fetched);
        setSelectedColor(fetched.colors[0]);
        setSelectedSize(fetched.sizes[0]);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Error loading product');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id, product]);

  if (loading) return <p>Loading product…</p>;
  if (error) return <p className={styles.errorMsg}>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <article className={styles.cardPage}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link to="/">Home</Link> <span>→</span> <Link to="/shop">Shop</Link> <span>→</span>
        <span className={styles.currentCrumb}>{product.title}</span>
      </nav>

      <div className={styles.contentCols}>
        {/* تصویر */}
        <div className={styles.cardPageImageWrap}>
          <img src={product.image} alt={product.title} />
        </div>

        {/* جزئیات */}
        <div className={styles.cardPageDetails}>
          <h1>{product.title}</h1>
          <p className={styles.cardPagePrice}>${product.price.toFixed(2)}</p>
          <p className={styles.cardPageCat}>
            Category: {DISPLAY_LABELS[product.category] ?? product.category}
          </p>
          <p className={styles.cardPageDesc}>{product.description}</p>

          {/* رنگ */}
          <div className={styles.optionSection}>
            <h3>Select Color</h3>
            <div className={styles.colorOptions}>
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`${styles.colorCircle} ${selectedColor === color ? styles.active : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* سایز */}
          <div className={styles.optionSection}>
            <h3>Select Size</h3>
            <div className={styles.sizeOptions}>
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* تعداد + Add to Cart */}
          <div className={styles.cartActions}>
            <div className={styles.quantityWrapper}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>–</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <button className={styles.addToCartBtn} onClick={() => addToCart(product, quantity)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CardPage;
