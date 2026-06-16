import { Link } from "react-router-dom";
import { useShop } from "../context/useShop";
import "./ShopPages.css";

function Wishlist() {
  const { wishlistItems, removeFromWishlist, moveWishlistItemToCart } =
    useShop();

  return (
    <main className="shop-page">
      <section className="shop-header">
        <div>
          <p className="shop-kicker">Saved products</p>
          <h1>Wishlist</h1>
        </div>

        <Link className="shop-link-btn" to="/explore">
          Continue Shopping
        </Link>
      </section>

      {wishlistItems.length === 0 ? (
        <section className="empty-state">
          <h2>Your wishlist is empty</h2>
          <p>Tap the heart icon to save products.</p>

          <Link className="primary-shop-btn" to="/explore">
            Explore Products
          </Link>
        </section>
      ) : (
        <section className="wishlist-grid">
          {wishlistItems.map((item) => (
            <article className="wishlist-card" key={item._id}>
              <Link
                className="wishlist-image"
                to={`/product/${item.product._id}`}
              >
                <img
                  src={item.product.images?.[0]?.url}
                  alt={item.product.name}
                />
              </Link>

              <div className="wishlist-info">
                <Link to={`/product/${item.product._id}`}>
                  <h2>{item.product.brand}</h2>

                  <p>{item.product.name}</p>
                </Link>

                <strong>
                  ₹
                  {(
                    item.product.discountedPrice || item.product.price
                  ).toLocaleString()}
                </strong>

                <span className="wishlist-rating">
                  ⭐ {item.product.averageRating}
                </span>
              </div>

              <div className="wishlist-actions">
                <button
                  className="primary-shop-btn"
                  onClick={() => moveWishlistItemToCart(item)}
                >
                  Move to Cart
                </button>

                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(item.product._id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Wishlist;
