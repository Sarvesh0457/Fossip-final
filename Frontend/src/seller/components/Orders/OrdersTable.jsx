import React from "react";
import OrderRow from "./OrderRow";
import "./OrderTable.css";

const OrdersTable = ({
  orders,
  activeTab,
  setActiveTab,
  setSelectedOrder,
  loadData,
}) => {
  const tabs = [
    "All Orders",
    "Pending Orders",
    "Confirmed Orders",
    "Packed Orders",
    "Shipped Orders",
    "Delivered Orders",
    "Cancelled Orders",
  ];

  return (
    <div className="orders-table-container">
      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                setSelectedOrder={setSelectedOrder}
                loadData={loadData}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
