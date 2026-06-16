import React from "react";
import { updateOrderStatus } from "../../services/orderService";

const OrderRow = ({ order, setSelectedOrder, loadData }) => {
  if (!order) return null;

  const handleStatusChange = async (e) => {
    try {
      await updateOrderStatus(order._id, e.target.value);

      // reload orders after updating
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr>
      <td>{order?._id}</td>

      <td>
        <select
          value={order.orderStatus || "pending"}
          onChange={handleStatusChange}
          className={`status-select ${order.orderStatus}`}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="packed">Packed</option>
          <option value="shipped">Shipped</option>
          <option value="out for delivery">Out For Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </td>

      <td>₹{order?.totalAmount || 0}</td>

      <td>
        {order?.createdAt
          ? new Date(order.createdAt).toLocaleDateString()
          : "-"}
      </td>

      <td>
        <button onClick={() => setSelectedOrder(order)}>View Details</button>
      </td>
    </tr>
  );
};

export default OrderRow;
