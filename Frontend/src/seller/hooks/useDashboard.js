// src/hooks/useDashboard.js

import { useEffect, useState } from "react";

import { dashboardService } from "../services/dashboardService";

const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await dashboardService.getDashboardData();

      setDashboardData(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return {
    dashboardData,
    loading,
    error,

    refreshDashboard: fetchDashboard,
  };
};

export default useDashboard;
