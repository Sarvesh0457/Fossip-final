import React from "react";
import "./OrderStatusChart.css";

const RecentOrders = ({ title, orders = [], viewAllLink }) => {
  return (
    <div className="recent-orders">
      <div className="section-header">
        <h3>{title}</h3>

        <a href={viewAllLink}>View All</a>
      </div>

      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>

                  <td>{order.customerName}</td>

                  <td>{order.product}</td>

                  <td>{order.date}</td>

                  <td>₹{Number(order.amount).toLocaleString()}</td>

                  <td>
                    <span
                      className={`status-badge ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
