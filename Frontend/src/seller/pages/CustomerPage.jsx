import React, { useEffect, useState, useMemo } from "react";
import "./CustomerPage.css";

import CustomerStats from "../components/Customer/CustomerStats";
import CustomerTable from "../components/Customer/CustomerTable";
import CustomerDetailsModal from "../components/Customer/CustomerDetailsModal";

import { getCustomers } from "../services/customerService";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setCustomers([]);
    }
  };

  const stats = useMemo(() => {
    const safeCustomers = Array.isArray(customers) ? customers : [];

    return {
      totalCustomers: safeCustomers.length,
      activeCustomers: safeCustomers.filter((c) => c.totalOrders > 0).length,
      totalRevenue: safeCustomers.reduce(
        (sum, c) => sum + (c.totalSpent || 0),
        0,
      ),
    };
  }, [customers]);

  return (
    <div className="customer-page">
      <CustomerStats stats={stats} />

      <CustomerTable
        customers={customers}
        setSelectedCustomer={setSelectedCustomer}
      />

      <CustomerDetailsModal
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
};

export default CustomerPage;
