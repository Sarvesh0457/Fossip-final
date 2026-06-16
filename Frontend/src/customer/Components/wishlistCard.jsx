import React from "react";
import "./WishlistCard.css";
import trash from "../Assets/trash.png";
import cart from "../Assets/Shopping cart.png";
import star from "../Assets/star.png";

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />

        <button className="delete-btn" onClick={() => onDelete(product.id)}>
          <img src={trash} alt="delete" />
        </button>
      </div>

      <button className="add-cart-btn">
        <img src={cart} alt="Cart" />
        Add to Cart
      </button>

      <div className="product-details">
        <h4>{product.name}</h4>

        <h3>₹{product.price}</h3>

        <div className="rating">
          {product.rating}
          <img src={star} alt="star" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
