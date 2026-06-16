import React from "react";

const CustomerRow = ({ customer, setSelectedCustomer }) => {
  return (
    <tr>
      <td>
        <div className="customer-info">
          <img
            src={
              customer.avatar ||
              "https://ui-avatars.com/api/?name=" + customer.username
            }
            alt=""
          />

          <div>
            <h4>{customer.username}</h4>
            <p>{customer.email}</p>
          </div>
        </div>
      </td>

      <td>
        <span className="active-badge">ACTIVE</span>
      </td>

      <td>{customer.totalOrders}</td>

      <td>₹{customer.totalSpent}</td>

      <td>
        {customer.lastOrderDate
          ? new Date(customer.lastOrderDate).toLocaleDateString()
          : "-"}
      </td>

      <td>
        <button
          className="details-btn"
          onClick={() => setSelectedCustomer(customer)}
        >
          View Details
        </button>
      </td>
    </tr>
  );
};

export default CustomerRow;
