import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import styles from "./CartPage.module.css";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const shipping = 0; // نمونه؛ در آینده قابل‌محاسبه
  const total = subtotal + shipping;

  const handleDecrease = (id, current) => {
    if (current > 1) updateQuantity(id, current - 1);
  };

  const handleIncrease = (id, current) => {
    updateQuantity(id, current + 1);
  };

  return (
    <section className={styles.cartPage}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <span aria-hidden="true">→</span>
        <span className={styles.currentCrumb}>Cart</span>
      </nav>

      {cartItems.length === 0 ? (
        <>
          <h1 className={styles.pageTitle}>Your Cart</h1>
          <p className={styles.emptyMsg}>Your cart is empty.</p>
          <Link to="/shop" className={styles.backToShop}>
            Continue Shopping
          </Link>
        </>
      ) : (
        <>
          <h1 className={styles.pageTitle}>Your Shopping Cart</h1>

          <div className={styles.cartLayout}>
            {/* Items */}
            <div className={styles.cartItems}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImageWrap}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemTopRow}>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title}`}
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    </div>

                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>

                    {/* Quantity under delete */}
                    <div className={styles.quantityUnderDelete}>
                      <div className={styles.quantity}>
                        <button
                          type="button"
                          onClick={() => handleDecrease(item.id, item.quantity)}
                          aria-label="Decrease quantity"
                        >
                          –
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleIncrease(item.id, item.quantity)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <aside className={styles.summary}>
              <h2>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button type="button" className={styles.checkoutBtn}>
                Proceed to Checkout
              </button>
            </aside>
          </div>
        </>
      )}
    </section>
  );
}

export default CartPage;
