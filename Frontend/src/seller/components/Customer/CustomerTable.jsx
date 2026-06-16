import React from "react";
import CustomerRow from "./CustomerRow";

const CustomerTable = ({ customers, setSelectedCustomer }) => {
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
          {customers.map((customer) => (
            <CustomerRow
              key={customer._id}
              customer={customer}
              setSelectedCustomer={setSelectedCustomer}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
