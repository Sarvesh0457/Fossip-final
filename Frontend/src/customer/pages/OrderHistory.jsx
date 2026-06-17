import { useEffect, useState } from "react";
import { getMyOrders } from "../api/order.api.js";
import OrderCard from "../Components/OrderCard";
import "./OrderHistory.css";

const OrderHistory = () => {
  console.log("OrderHistory rendered");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect running");
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    console.log("fetchOrders called");

    try {
      const data = await getMyOrders();
      console.log("Orders:", data);

      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="orders-loading">Loading Orders...</div>;
  }

  if (!orders.length) {
    return (
      <div className="empty-orders">
        <h2>No Orders Yet</h2>

        <p>Your purchased products will appear here.</p>
      </div>
    );
  }

  return (
    <div className="order-history-page">
      <div className="order-history-header">
        <h1>My Orders</h1>

        <p>View all your previous purchases</p>
      </div>

      <div className="orders-container">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
