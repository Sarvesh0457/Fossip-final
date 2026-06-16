import React from "react";
import "./CustomerModal.css";
import { getProductImageUrl } from "../../../utils/productImage";

const CustomerDetailsModal = ({ customer, onClose }) => {
  if (!customer) return null;

  return (
    <div className="modal-overlay">
      <div className="customer-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <h2>Customer Details</h2>

        <div className="customer-section">
          <p>
            <strong>Name:</strong>
            {customer.username}
          </p>

          <p>
            <strong>Email:</strong>
            {customer.email}
          </p>

          <p>
            <strong>Phone:</strong>
            {customer.phoneNumber}
          </p>

          <p>
            <strong>Address:</strong>
            {customer.address?.street}, {customer.address?.city},{" "}
            {customer.address?.state}
          </p>
        </div>

        <h3>Ordered Products</h3>

        <div className="products-list">
          {customer.products?.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={getProductImageUrl(product)} alt={product.name} />

              <div>
                <h4>{product.name}</h4>

                <p>Qty :{product.quantity}</p>

                <p>Size :{product.size}</p>

                <p>Color :{product.color}</p>

                <p>₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
