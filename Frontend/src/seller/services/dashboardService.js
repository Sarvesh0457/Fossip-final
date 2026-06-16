// src/services/dashboardService.js

// Example using fetch.
// Replace BASE_URL with your backend URL.

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const dashboardService = {
  async getDashboardData() {
    try {
      const response = await fetch(`${BASE_URL}/dashboard`, {
        headers: {
          "Content-Type": "application/json",

          // Authorization:
          // `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data.");
      }

      return await response.json();
    } catch (error) {
      console.error(error);

      // Temporary fallback data
      return mockDashboardData;
    }
  },
};

/*
|--------------------------------------------------------------------------
| Temporary Mock Data
|--------------------------------------------------------------------------
| Remove this once backend is connected.
|
*/

const mockDashboardData = {
  stats: {
    totalRevenue: {
      value: "₹1,28,400",
      growth: "+12%",
    },

    orders: {
      value: 1240,
      growth: "+5%",
    },

    products: {
      value: 450,
    },

    newCustomers: {
      value: 84,
      growth: "+8%",
    },

    pendingOrders: {
      value: 24,
    },

    deliveredOrders: {
      value: 980,
    },
  },

  monthlySales: [
    { month: "JAN", sales: 18000 },
    { month: "FEB", sales: 22000 },
    { month: "MAR", sales: 26000 },
    { month: "APR", sales: 31000 },
    { month: "MAY", sales: 35000 },
    { month: "JUN", sales: 42000 },
  ],

  orderStatus: [
    {
      name: "Delivered",
      value: 980,
    },
    {
      name: "Shipped",
      value: 236,
    },
    {
      name: "Pending",
      value: 24,
    },
  ],

  recentOrders: [
    {
      id: 10245,
      customerName: "John Smith",

      product: "Leather Jacket",

      date: "2026-06-13",

      amount: 4999,

      status: "Delivered",
    },

    {
      id: 10246,
      customerName: "Emma Wilson",

      product: "Running Sneakers",

      date: "2026-06-13",

      amount: 2999,

      status: "Pending",
    },

    {
      id: 10247,
      customerName: "David Brown",

      product: "Travel Backpack",

      date: "2026-06-12",

      amount: 4599,

      status: "Shipped",
    },
  ],

  topProducts: [
    {
      id: 1,
      name: "Classic Denim Jacket",

      category: "Outerwear",

      image: "https://placehold.co/80x80",

      unitsSold: 142,

      revenue: 85200,
    },

    {
      id: 2,
      name: "Running Sneakers",

      category: "Footwear",

      image: "https://placehold.co/80x80",

      unitsSold: 98,

      revenue: 73500,
    },

    {
      id: 3,
      name: "Travel Backpack",

      category: "Bags",

      image: "https://placehold.co/80x80",

      unitsSold: 76,

      revenue: 68400,
    },
  ],

  categoryMix: [
    {
      id: 1,
      name: "Footwear",
      percentage: 42,
      orders: 524,
      color: "#2563eb",
    },

    {
      id: 2,
      name: "Outerwear",
      percentage: 31,
      orders: 389,
      color: "#22c55e",
    },

    {
      id: 3,
      name: "Accessories",
      percentage: 18,
      orders: 221,
      color: "#f59e0b",
    },

    {
      id: 4,
      name: "Bags",
      percentage: 9,
      orders: 106,
      color: "#ef4444",
    },
  ],
};
