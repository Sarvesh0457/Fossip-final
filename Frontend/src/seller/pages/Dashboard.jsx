import React from "react";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

import "./Dashboard.css";

import StatCard from "../components/charts/StatCard";
import SalesChart from "../components/charts/SalesChart";
import OrderStatusChart from "../components/charts/OrderStatusChart";
import RecentOrders from "../components/charts/RecentOrders";
import TopProducts from "../components/charts/TopProducts";
import CategoryMix from "../components/charts/CategoryMix";

import useDashboard from "../hooks/useDashboard";

const Dashboard = () => {
  const { dashboardData, loading, error } = useDashboard();

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="dashboard-error">No dashboard data found.</div>;
  }

  const {
    stats,
    monthlySales,
    orderStatus,
    recentOrders,
    topProducts,
    categoryMix,
  } = dashboardData;

  return (
    <div className="dashboard-container">
      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue.value}
          growth={stats.totalRevenue.growth}
          icon={TrendingUp}
          growthType="positive"
        />

        <StatCard
          title="Orders"
          value={stats.orders.value}
          growth={stats.orders.growth}
          icon={ShoppingBag}
          growthType="positive"
        />

        <StatCard
          title="Total Products"
          value={stats.products.value}
          icon={Package}
        />

        <StatCard
          title="New Customers"
          value={stats.newCustomers.value}
          growth={stats.newCustomers.growth}
          icon={Users}
          growthType="positive"
        />

        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders.value}
          icon={Clock}
        />

        <StatCard
          title="Delivered Orders"
          value={stats.deliveredOrders.value}
          icon={CheckCircle}
        />
      </div>

      {/* Charts */}
      <div className="dashboard-charts">
        <div className="dashboard-card sales-card">
          <SalesChart
            title="Monthly Sales Performance"
            subtitle="Visualizing sales growth over the last 6 months"
            data={monthlySales}
            period="Last 6 Months"
          />
        </div>

        <div className="dashboard-card order-status-card">
          <OrderStatusChart
            title="Order Status"
            totalOrders={stats.orders.value}
            data={orderStatus}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="dashboard-bottom">
        <div className="dashboard-left">
          <div className="dashboard-card">
            <RecentOrders
              title="Recent Orders"
              orders={recentOrders}
              viewAllLink="/orders"
            />
          </div>
        </div>

        <div className="dashboard-right">
          <div className="dashboard-card">
            <TopProducts title="Top Products" products={topProducts} />
          </div>

          <div className="dashboard-card">
            <CategoryMix title="Category Mix" categories={categoryMix} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
