import React, { useEffect, useState, useMemo } from "react";
import DashboardStats from "../components/Orders/DashboardStats";
import OrdersTable from "../components/Orders/OrdersTable";
import OrderDetailsModal from "../components/Orders/OrderDetailsModal";
import { getOrders } from "../services/orderService";
import "./Orderdashboard.css";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("All Orders");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const ordersData = await getOrders();
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (error) {
      console.error("Failed to load orders:", error);
      setOrders([]);
    }
  };

  // Dashboard statistics
  const stats = useMemo(() => {
    const safeOrders = Array.isArray(orders) ? orders : [];

    const countStatus = (status) =>
      safeOrders.filter((order) => order?.orderStatus === status).length;

    return {
      totalOrders: safeOrders.length,
      pending: countStatus("pending"),
      confirmed: countStatus("confirmed"),
      packed: countStatus("packed"),
      shipped: countStatus("shipped"),
      delivered: countStatus("delivered"),
      cancelled: countStatus("cancelled"),
      revenue: safeOrders.reduce(
        (sum, order) => sum + (order?.totalAmount || 0),
        0,
      ),
    };
  }, [orders]);

  // Filter orders by tab
  const filteredOrders = useMemo(() => {
    if (activeTab === "All Orders") {
      return orders;
    }

    const statusMap = {
      "Pending Orders": "pending",
      "Confirmed Orders": "confirmed",
      "Packed Orders": "packed",
      "Shipped Orders": "shipped",
      "Delivered Orders": "delivered",
      "Cancelled Orders": "cancelled",
    };

    const status = statusMap[activeTab];

    if (!status) return orders;

    return orders.filter((order) => order?.orderStatus === status);
  }, [orders, activeTab]);

  return (
    <div className="dashboard-container">
      <DashboardStats stats={stats} />

      <OrdersTable
        orders={filteredOrders}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSelectedOrder={setSelectedOrder}
        loadData={loadData}
      />

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersDashboard;
