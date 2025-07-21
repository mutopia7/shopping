import styles from './Card.module.css'

function Card({image, title, price}){
    return (
        <article className={styles.card}>
            <img src={image} alt={title} className={styles.cardImage} />
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardPrice}>${price.toFixed(2)}</p>
            <button onClick={() => {}} className={styles.cardButton}>Add to Cart</button>
        </article>
    )
}

export default Card;