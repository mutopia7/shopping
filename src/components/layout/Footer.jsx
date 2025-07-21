import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

/**
 * Accessible + Responsive Footer
 * - Newsletter signup form (optional; wire up later)
 * - Semantic headings + aria-labelledby for columns
 * - Screen-reader-only labels
 * - Uses Link for internal navigation
 */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* CTA / Newsletter */}
      <section
        className={styles.footerCta}
        aria-labelledby="footer-cta-heading"
      >
        <h2 id="footer-cta-heading" className={styles.footerCtaHeading}>
          Join our newsletter & get 20% off
        </h2>
        <p className={styles.footerCtaSub}>
          Be the first to know about new arrivals, sales & exclusive offers.
        </p>
        <form
          className={styles.footerCtaForm}
          aria-label="Subscribe to newsletter"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: handle subscription
          }}
        >
          <label htmlFor="footer-email" className={styles.srOnly}>
            Email address
          </label>
          <input
            id="footer-email"
            type="email"
            placeholder="Enter your email"
            required
            inputMode="email"
            autoComplete="email"
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* Main Footer Content */}
      <div className={styles.footerMain}>
        {/* Brand block */}
        <div className={styles.footerBrand}>
          <Link to="/" className={styles.footerLogo}>
            M.Shop
          </Link>
          <p className={styles.footerDesc}>
            Your one‑stop shop for the best products at great prices.
          </p>
        </div>

        {/* Link columns */}
        <nav
          className={styles.footerNav}
          aria-label="Footer navigation"
        >
          <div className={styles.footerCol} aria-labelledby="footer-col-company">
            <h3 id="footer-col-company">Company</h3>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/press">Press</Link></li>
            </ul>
          </div>

          <div className={styles.footerCol} aria-labelledby="footer-col-support">
            <h3 id="footer-col-support">Support</h3>
            <ul>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
            </ul>
          </div>

          <div className={styles.footerCol} aria-labelledby="footer-col-legal">
            <h3 id="footer-col-legal">Legal</h3>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom strip */}
      <div className={styles.footerBottom}>
        <p>© {year} M.Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
