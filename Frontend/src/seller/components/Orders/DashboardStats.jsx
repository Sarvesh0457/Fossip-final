import React from "react";
import StatCard from "./StatCard";

const DashboardStats = ({ stats }) => {
  return (
    <div className="stats-grid">
      <StatCard
        title="TOTAL ORDERS"
        value={stats.totalOrders}
        extra="+12.5%"
        color="green"
      />

      <StatCard
        title="AWAITING SHIPMENT"
        value={stats.pending}
        extra={`${stats.pending} Pending`}
        color="orange"
      />

      <StatCard
        title="DAILY SHIPPED"
        value={stats.shippedToday}
        extra="24 In Transit"
        color="gray"
      />

      <StatCard
        title="REVENUE (NET)"
        value={`$${stats.revenue}`}
        extra="+8%"
        color="green"
      />
    </div>
  );
};

export default DashboardStats;
