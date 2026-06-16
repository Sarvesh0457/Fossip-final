import { Link } from "react-router-dom";
import { useShop } from "../context/useShop";
import "./ShopPages.css";

import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, clearCart, removeFromCart, updateCartQuantity } =
    useShop();
  const navigate = useNavigate();

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
  };

  const cartSubtotal = getSubtotal();

  const deliveryFee = cartSubtotal > 1499 || cartSubtotal === 0 ? 0 : 99;
  const platformFee = cartSubtotal > 0 ? 20 : 0;
  const orderTotal = cartSubtotal + deliveryFee + platformFee;

  if (cartItems.length === 0) {
    return (
      <main className="shop-page">
        <section className="empty-state">
          <h2>Your cart is empty</h2>
          <Link className="primary-shop-btn" to="/explore">
            Explore Products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="shop-page">
      <section className="shop-header">
        <h1>Cart</h1>
        <Link className="shop-link-btn" to="/explore">
          Continue Shopping
        </Link>
      </section>

      <section className="cart-layout">
        <div className="cart-list">
          {cartItems.map((item) => (
            <article className="cart-item" key={item._id}>
              {/* IMAGE */}
              <Link className="cart-thumb" to={`/product/${item.product._id}`}>
                <img
                  src={item.product.images?.[0]?.url}
                  alt={item.product.name}
                />
              </Link>

              {/* INFO */}
              <div className="cart-info">
                <Link to={`/product/${item.product._id}`}>
                  <h2>{item.product.brand}</h2>
                  <p>{item.product.name}</p>
                </Link>

                <p className="item-meta">
                  {item.product.description?.slice(0, 60)}...
                </p>

                {item.size && (
                  <span className="item-meta">Size: {item.size}</span>
                )}

                <strong>Rs. {item.product.price}</strong>

                {/* QUANTITY */}
                <div className="quantity-row">
                  <button
                    onClick={() =>
                      updateCartQuantity(item._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateCartQuantity(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              {/* REMOVE */}
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>

        {/* SUMMARY */}
        <aside className="summary-panel">
          <h2>Price Details</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>Rs. {cartSubtotal}</strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <strong>{deliveryFee === 0 ? "Free" : `Rs. ${deliveryFee}`}</strong>
          </div>

          <div className="summary-row">
            <span>Platform fee</span>
            <strong>Rs. {platformFee}</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>Rs. {orderTotal}</strong>
          </div>

          <button
            className="primary-shop-btn"
            onClick={() => navigate("/payment")}
          >
            Place Order
          </button>

          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </aside>
      </section>
    </main>
  );
}

export default Cart;
