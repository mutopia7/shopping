import styles from './Card.module.css'

function Card({ image, title, price }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <img src={image} alt={title} className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardPrice}>${price.toFixed(2)}</p>
      </div>
      <button onClick={() => {}} className={styles.cardButton}>Add to Cart</button>
    </article>
  )
}

export default Card;
