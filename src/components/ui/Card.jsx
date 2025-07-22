import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { slugify } from '../../utils/slugify';
import { useCart } from '../../context/CartContext';

function Card({ id, image, title, price }) {
  const slug = slugify(title);
  const productLink = `/shop/${id}-${slug}`;
  const { addToCart } = useCart(); // for add to cart

  return (
    <article className={styles.card}>
      <Link to={productLink} className={styles.cardLink}>
        <div className={styles.cardImageWrapper}>
          <img src={image} alt={title} className={styles.cardImage} />
        </div>
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardPrice}>${price.toFixed(2)}</p>
        </div>
      </Link>
      <button
        onClick={() => addToCart({ id, image, title, price }, 1)}
        className={styles.cardButton}
        type="button"
      >
        Add to Cart
      </button>
    </article>
  );
}

export default Card;
