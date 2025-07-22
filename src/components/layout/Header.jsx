import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import styles from "./Header.module.css";

function Header() {
  const { cartItems } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    const lower = searchTerm.toLowerCase();
    const results = products.filter((p) =>
      p.title.toLowerCase().includes(lower)
    ).slice(0, 5);
    setSearchResults(results);
  }, [searchTerm, products]);

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  }

  function onSelectProduct(id, title) {
    setSearchTerm("");
    setSearchResults([]);
    setMobileMenuOpen(false);
    navigate(`/shop/${id}-${slugify(title)}`);
  }

  // وقتی مسیر عوض میشه، منوی موبایل بسته شود (مثلا کاربر کلیک کرد یا صفحه تغییر کرد)
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchResults([]);
    setSearchTerm("");
  }, [location]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logoWrapper}>
          <Link to="/" className={styles.logo}>
            M.Shop
          </Link>
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <nav
          className={`${styles.nav} ${
            mobileMenuOpen ? styles.mobileOpen : ""
          }`}
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={styles.navLink}
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className={styles.navLink}
          >
            Shop
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={styles.navLink}
          >
            About
          </Link>

          {/* جستجو داخل منو */}
          <div className={styles.searchWrapper} ref={searchRef}>
            <input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search products"
              className={styles.searchInput}
            />
            {searchResults.length > 0 && (
              <ul className={styles.searchResults} role="listbox">
                {searchResults.map((p) => (
                  <li
                    key={p.id}
                    className={styles.searchResultItem}
                    role="option"
                    tabIndex={0}
                    onClick={() => onSelectProduct(p.id, p.title)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSelectProduct(p.id, p.title);
                    }}
                  >
                    {p.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        {/* سبد خرید و تعداد */}
        <Link
          to="/cart"
          className={styles.cartIcon}
          aria-label={`Cart with ${totalItems} items`}
        >
          <FaShoppingCart size={24} />
          {totalItems > 0 && (
            <span
              className={styles.cartBadge}
              aria-live="polite"
              aria-atomic="true"
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
