// src/seller/components/products/CreateProductCard.jsx

import React from "react";
import "./CreateProductCard.css";
import { useState, useEffect } from "react";

const CreateProductCard = ({ product, onInputChange, onCreateProduct }) => {
  const [sizeInput, setSizeInput] = useState(product.size.join(", "));
  const [colorInput, setColorInput] = useState(product.color.join(", "));

  useEffect(() => {
    setSizeInput(product.size.join(", "));
  }, [product.size]);

  useEffect(() => {
    setColorInput(product.color.join(", "));
  }, [product.color]);

  // Clean, uninterrupted local state changes
  const handleSizeChange = (val) => {
    setSizeInput(val);
  };

  const handleColorChange = (val) => {
    setColorInput(val);
  };

  const handleSubmit = (e) => {
    // Convert your text strings into arrays right now
    const finalSizes = sizeInput
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
    const finalColors = colorInput
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    // Inject them into the parent form state
    onInputChange("size", finalSizes);
    onInputChange("color", finalColors);

    // Trigger your original save/create function
    onCreateProduct(e);
  };

  return (
    <div className="create-product-card">
      <div className="create-product-card-header">
        <h2>Create Product</h2>
        <p>Add a new product to your store.</p>
      </div>

      <div className="product-grid">
        {/* Product Name */}
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            placeholder="Oversized T-Shirt"
          />
        </div>

        {/* Brand */}
        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            value={product.brand}
            onChange={(e) => onInputChange("brand", e.target.value)}
            placeholder="Nike"
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={product.category}
            onChange={(e) => onInputChange("category", e.target.value)}
            placeholder="Clothing"
          />
        </div>

        {/* Sub Category */}
        <div className="form-group">
          <label>Sub Category</label>
          <input
            type="text"
            value={product.subCategory}
            onChange={(e) => onInputChange("subCategory", e.target.value)}
            placeholder="T-Shirts"
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>
          <select
            value={product.gender}
            onChange={(e) => onInputChange("gender", e.target.value)}
          >
            <option value="">Select</option>
            <option>Men</option>
            <option>Women</option>
            <option>Unisex</option>
          </select>
        </div>

        {/* Fabric */}
        <div className="form-group">
          <label>Fabric</label>
          <input
            type="text"
            value={product.fabric}
            onChange={(e) => onInputChange("fabric", e.target.value)}
            placeholder="Cotton"
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => onInputChange("price", e.target.value)}
          />
        </div>

        {/* Discounted Price */}
        <div className="form-group">
          <label>Discounted Price</label>
          <input
            type="number"
            value={product.discountedPrice}
            onChange={(e) => onInputChange("discountedPrice", e.target.value)}
          />
        </div>

        {/* Quantity */}
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            value={product.quantity}
            onChange={(e) => onInputChange("quantity", e.target.value)}
          />
        </div>

        {/* Low Stock Threshold */}
        <div className="form-group">
          <label>Low Stock Threshold</label>
          <input
            type="number"
            value={product.lowStockThreshold}
            onChange={(e) => onInputChange("lowStockThreshold", e.target.value)}
          />
        </div>

        {/* Sizes */}
        <div className="form-group">
          <label>Sizes (comma separated)</label>
          <input
            type="text"
            value={sizeInput} // 👈 Change this
            onChange={(e) => handleSizeChange(e.target.value)} // 👈 Change this
            placeholder="S,M,L,XL"
          />
        </div>

        {/* Colors */}
        <div className="form-group">
          <label>Colors (comma separated)</label>
          <input
            type="text"
            value={colorInput} // 👈 Change this
            onChange={(e) => handleColorChange(e.target.value)} // 👈 Change this
            placeholder="Black,White"
          />
        </div>

        {/* Delivery Time */}
        <div className="form-group">
          <label>Delivery Time</label>
          <input
            type="text"
            value={product.deliveryTime}
            onChange={(e) => onInputChange("deliveryTime", e.target.value)}
            placeholder="3-5 Days"
          />
        </div>

        {/* Featured */}
        <div className="form-group">
          <label>Featured Product</label>

          <select
            value={product.isFeatured}
            onChange={(e) =>
              onInputChange("isFeatured", e.target.value === "true")
            }
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>

        {/* Description */}
        <div className="form-group full-width">
          <label>Description</label>

          <textarea
            rows="5"
            value={product.description}
            onChange={(e) => onInputChange("description", e.target.value)}
            placeholder="Product description..."
          />
        </div>

        {/* Images */}
        {/* Images */}
        <div className="form-group full-width">
          <label>Product Images (Maximum 5 images, each ≤ 5MB)</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              onInputChange("images", Array.from(e.target.files))
            }
          />

          {product.images.length > 0 && (
            <div className="image-preview-container">
              {product.images.map((image, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button className="create-product-btn" onClick={handleSubmit}>
        Create Product
      </button>
    </div>
  );
};

export default CreateProductCard;
