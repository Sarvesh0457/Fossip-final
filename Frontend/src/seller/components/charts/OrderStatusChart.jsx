import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#10b981", // Premium Emerald (Delivered)
  "#3b82f6", // Premium Blue (Shipped)
  "#f59e0b", // Premium Amber (Pending)
  "#ef4444", // Premium Red (Cancelled)
];

const OrderStatusChart = ({ title, totalOrders, data = [] }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="order-tooltip">
          <p className="order-tooltip-name">{payload[0].name}</p>
          <p className="order-tooltip-value">{payload[0].value} Orders</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="order-status-chart">
      <div className="chart-header">
        <div>
          <h3>{title}</h3>
          <p>Total Orders: {totalOrders}</p>
        </div>
      </div>

      <div className="pie-wrapper">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderStatusChart;