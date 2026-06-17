import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useShop } from "../context/useShop";
import { useAuth } from "../context/AuthContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { wishlistItems, addToWishlist, removeFromWishlist, addToCart } =
    useShop();
  const { user } = useAuth();

  const productId = product._id || product.id;

  const handleClick = () => {
    navigate(`/product/${productId}`);
  };

  const isWishlisted = wishlistItems.some(
    (item) => item.product?._id === productId,
  );

  const handleHeartClick = (e) => {
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    if (isWishlisted) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const handleCartClick = async (e) => {
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    const defaultSize =
      product.size && product.size.length > 0 ? product.size[0] : null;

    const success = await addToCart(product, defaultSize);
    if (success) {
      alert("Added to cart!");
    }
  };

  return (
    <article className="product-card" onClick={handleClick}>
      <div className="image-wrap">
        <img
          src={product.images?.[0]?.url || product.image || product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        {product.age && <span className="age-badge">{product.age}</span>}
      </div>

      <div className="product-details-card">
        <div className="card-header-row">
          <div className="card-title-group">
            <h3>{product.brand}</h3>
            <p className="product-name-truncate">{product.name}</p>
          </div>
          <button
            className="heart-button-inline"
            onClick={handleHeartClick}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <Heart
              size={20}
              fill={isWishlisted ? "var(--accent-color)" : "transparent"}
              color={isWishlisted ? "var(--accent-color)" : "var(--text-muted)"}
            />
          </button>
        </div>

        <div className="price-rating-row">
          <strong>Rs. {product.discountedPrice || product.price}</strong>
          <span className="rating-pill">
            {product.averageRating || product.rating || 0} ★
          </span>
        </div>

        <button className="card-cart-btn" onClick={handleCartClick}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
