import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/useShop";
import "./ShopPages.css";

function Wishlist() {
  const { user } = useAuth();
  const { wishlistItems, removeFromWishlist, moveWishlistItemToCart } =
    useShop();

  const validWishlistItems = wishlistItems.filter((item) => item.product);

  if (!user) {
    return (
      <main className="shop-page">
        <section className="empty-state">
          <h2>Log in to view your wishlist</h2>
          <p>Save products you love and find them here later.</p>

          <Link className="primary-shop-btn" to="/login">
            Log In
          </Link>
        </section>
      </main>
    );
  }

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

      {validWishlistItems.length === 0 ? (
        <section className="empty-state">
          <h2>Your wishlist is empty</h2>
          <p>Tap the heart icon to save products.</p>

          <Link className="primary-shop-btn" to="/explore">
            Explore Products
          </Link>
        </section>
      ) : (
        <section className="wishlist-grid">
          {validWishlistItems.map((item) => {
            const product = item.product;
            const price = product.discountedPrice || product.price;

            return (
              <article className="wishlist-card" key={item._id}>
                <Link
                  className="wishlist-image"
                  to={`/product/${product._id}`}
                >
                  <img
                    src={product.images?.[0]?.url || product.image || product.imageUrl}
                    alt={product.name}
                  />
                </Link>

                <div className="wishlist-info">
                  <Link to={`/product/${product._id}`}>
                    <h2>{product.brand}</h2>
                    <p>{product.name}</p>
                  </Link>

                  <strong>Rs. {Number(price || 0).toLocaleString()}</strong>

                  <span className="wishlist-rating">
                    ★ {product.averageRating || product.rating || 0}
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
                    onClick={() => removeFromWishlist(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Wishlist;
