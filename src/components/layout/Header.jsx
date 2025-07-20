import { Link } from 'react-router-dom';
import styles from './Header.module.css'
import { FiShoppingCart } from "react-icons/fi";  




function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>M.Shop</div>
            <nav className={styles.headerNav}>
                <ul className={styles.headerLinks}> 
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/"}>Shop</Link></li>
                    <li><Link to={"/"}>about</Link></li>
                </ul>
            <form action="">
                <input type="search" placeholder='Search for products...' />
            </form>
            <Link to={"/"} className={styles.cartLink} aria-label="Shopping Cart">
                <FiShoppingCart size={20} />
            </Link>
            </nav>
        </header>
    )
}


export default Header;