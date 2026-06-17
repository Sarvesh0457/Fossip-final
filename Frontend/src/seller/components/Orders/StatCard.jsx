import React from "react";

const StatCard = ({ title, value, extra, color }) => {
  return (
    <div className="stat-card">
      <div className={`stat-extra ₹{color}`}>{extra}</div>

      <h4>{title}</h4>

      <h2>{value}</h2>
    </div>
  );
};

export default StatCard;
