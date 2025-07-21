import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import Card from "../components/ui/Card"; 
import heroImage from '../assets/shopping.jpg';

function HomePage() {
  // نمونه محصولات تستی
  const featuredProducts = [
    {
      id: 1,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      title: "Leather Backpack",
      price: 89.99,
    },
    {
      id: 2,
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      title: "Men's Cotton Jacket",
      price: 49.99,
    },
    {
      id: 3,
      image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
      title: "Gaming Monitor",
      price: 299.99,
    },
  ];

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
          <img src={heroImage} alt="Fashion Banner" className={styles.heroImage} />
        </div>
      </section>

      {/* Featured Categories */}
      <section className={styles.categories}>
        <h2>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          <Link to="/shop?cats=men" className={styles.categoryCard}>Men</Link>
          <Link to="/shop?cats=women" className={styles.categoryCard}>Women</Link>
          <Link to="/shop?cats=accessories" className={styles.categoryCard}>Accessories</Link>
          <Link to="/shop?cats=electronics" className={styles.categoryCard}>Electronics</Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featured}>
        <h2>Featured Products</h2>
        <div className={styles.featuredGrid}>
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
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