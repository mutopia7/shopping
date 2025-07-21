import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>M.Shop</div>

      {/* دکمه همبرگر فقط در موبایل */}
      <button 
        className={styles.menuToggle} 
        aria-label="Toggle navigation menu" 
        onClick={toggleMenu}
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <nav className={`${styles.headerNav} ${isMenuOpen ? styles.showMenu : ''}`}>
        <ul className={styles.headerLinks}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <form action="">
          <input type="search" placeholder="Search for products..." />
        </form>

        <Link to="/cart" className={styles.cartLink} aria-label="Shopping Cart">
          <FiShoppingCart size={20} />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
