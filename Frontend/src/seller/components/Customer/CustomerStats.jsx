import React from "react";

const CustomerStats = ({ stats }) => {
  return (
    <div className="customer-stats">
      <div className="stat-card">
        <h4>Total Customers</h4>
        <h2>{stats.totalCustomers}</h2>
      </div>

      <div className="stat-card">
        <h4>Active Customers</h4>
        <h2>{stats.activeCustomers}</h2>
      </div>

      <div className="stat-card">
        <h4>Total Revenue</h4>
        <h2>₹{stats.totalRevenue}</h2>
      </div>
    </div>
  );
};

export default CustomerStats;
