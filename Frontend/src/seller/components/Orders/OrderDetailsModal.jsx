import React from "react";
import "./OrderDetailsModal.css";
import { getProductImageUrl } from "../../../utils/productImage";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const paymentMethod =
    order.paymentMethod === "cod" ? "Cash on Delivery" : "Card Payment";

  return (
    <div className="modal-overlay">
      <div className="order-modal">
        <div className="modal-header">
          <h2>Order Details</h2>

          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>

        {/* Customer Information */}
        <div className="detail-section">
          <h3>Customer Information</h3>

          <p>
            <strong>Name:</strong> {order.user?.username}
          </p>

          <p>
            <strong>Email:</strong> {order.user?.email}
          </p>

          <p>
            <strong>Phone:</strong> {order.user?.phoneNumber}
          </p>
        </div>

        {/* Shipping Address */}
        <div className="detail-section">
          <h3>Shipping Address</h3>

          <p>{order.shippingAddress?.street}</p>

          <p>
            {order.shippingAddress?.city}, {order.shippingAddress?.state}
          </p>

          <p>{order.shippingAddress?.country}</p>

          <p>Pincode : {order.shippingAddress?.pincode}</p>
        </div>

        {/* Products */}
        <div className="detail-section">
          <h3>Products</h3>

          {order.items?.map((item) => (
            <div className="product-card" key={item._id}>
              <img
                src={getProductImageUrl(item.product)}
                alt={item.product?.name}
              />

              <div className="product-info">
                <h4>{item.product?.name}</h4>

                <p>Quantity : {item.quantity}</p>

                <p>Size : {item.size}</p>

                <p>Color : {item.color}</p>

                <p>Price : Rs. {item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment */}
        <div className="detail-section">
          <h3>Payment</h3>

          <p>
            <strong>Method :</strong> {paymentMethod}
          </p>

          <p>
            <strong>Status :</strong> {order.paymentStatus}
          </p>

          {order.paymentId && (
            <p>
              <strong>Payment ID :</strong> {order.paymentId}
            </p>
          )}

          <p>
            <strong>Total Amount :</strong> Rs. {order.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
