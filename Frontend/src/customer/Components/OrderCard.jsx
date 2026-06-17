import "./OrderCard.css";
import OrderProgressBar from "./OrderProgressBar";

const OrderCard = ({ order }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="order-card">
      {order.items.map((item) => (
        <div className="product-row" key={item._id}>
          <div className="image-container">
            <img
              src={item.product.images?.[0]?.url}
              alt={item.product.name}
              className="orders-product-image"
            />
          </div>

          <div className="product-details">
            <h3>{item.product.name}</h3>

            <p className="sub-title">{item.product.category}</p>

            <p>Qty: {item.quantity}</p>

            <p className="order-id">
              Order ID: #{order._id.slice(-10).toUpperCase()}
            </p>
          </div>

          <div className="price-section">
            <h3>₹{item.price}</h3>
          </div>
        </div>
      ))}
      <div className="Progress-bar-orders">
        <OrderProgressBar status={order.orderStatus} />
      </div>
    </div>
  );
};

export default OrderCard;
