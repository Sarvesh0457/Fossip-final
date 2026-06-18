import React from "react";
import CustomerRow from "./CustomerRow";

const CustomerTable = ({ customers, setSelectedCustomer }) => {
  const safeCustomers = Array.isArray(customers) ? customers : [];

  return (
    <div className="customer-table-container">
      <table className="customer-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Status</th>
            <th>Orders</th>
            <th>Total Spent</th>
            <th>Last Order</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {safeCustomers.length > 0 ? (
            safeCustomers.map((customer) => (
              <CustomerRow
                key={customer._id}
                customer={customer}
                setSelectedCustomer={setSelectedCustomer}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
