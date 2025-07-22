import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import Card from '../components/ui/Card';
import heroImage from '../assets/shopping.jpg';
import { useProducts } from '../context/ProductContext';

function HomePage() {
  const { products, loading, error } = useProducts();

  // انتخاب 3 محصول برجسته
  const featuredProducts = products.slice(0, 3);

  return (
    <main className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Discover Your Style</h1>
          <p>Explore the latest trends and shop your favorite products now.</p>
          <Link to="/shop" className={styles.heroButton}>Shop Now</Link>
        </div>
        <div className={styles.heroImage}>
          <img src={heroImage} alt="Fashion Banner" />
        </div>
      </section>

      {/* Featured Products (از Context) */}
      <section className={styles.featured}>
        <h2>Featured Products</h2>

        {loading && <p>Loading...</p>}
        {error && !loading && <p className={styles.errorMsg}>{error}</p>}
        {!loading && !error && (
          <div className={styles.featuredGrid}>
            {featuredProducts.map((p) => (
              <Card
                key={p.id}
                id={p.id}
                image={p.image}
                title={p.title}
                price={p.price}
              />
            ))}
          </div>
        )}
      </section>

      {/* Shop by Category */}
      <section className={styles.categories}>
        <h2>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          <Link to="/shop?cats=men" className={styles.categoryCard}>Men</Link>
          <Link to="/shop?cats=women" className={styles.categoryCard}>Women</Link>
          <Link to="/shop?cats=accessories" className={styles.categoryCard}>Accessories</Link>
          <Link to="/shop?cats=electronics" className={styles.categoryCard}>Electronics</Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <h2>Get 20% Off Your First Order</h2>
        <Link to="/shop" className={styles.ctaButton}>Start Shopping</Link>
      </section>
    </main>
  );
}

export default HomePage;
