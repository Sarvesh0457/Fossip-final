import { useState } from "react";
import "./OrderProgressBar.css";

const statuses = [
  "confirmed",
  "packed",
  "shipped",
  "out for delivery",
  "delivered",
];

const OrderProgressBar = ({ status }) => {
  const [open, setOpen] = useState(false);

  if (status === "cancelled") {
    return (
      <div className="cancelled-container">
        <div className="cancelled-bar"></div>

        <span className="cancelled-text">Order Cancelled</span>
      </div>
    );
  }

  const currentStep = statuses.indexOf(status);
  const percentage = ((currentStep + 1) / statuses.length) * 100;

  return (
    <div className="progress-wrapper">
      {/* Header */}
      <div className="progress-header" onClick={() => setOpen(!open)}>
        <div className="delivery-status">
          ✓ {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>

        <div className={`dropdown-arrow ${open ? "rotate" : ""}`}>▼</div>
      </div>

      {/* Expandable Content */}
      {open && (
        <div className="progress-container">
          <div className="progress-line">
            <div
              className="progress-fill"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>

          <div className="progress-status-row">
            {statuses.map((item, index) => (
              <div className="status-step" key={item}>
                <div
                  className={`status-dot ${
                    index <= currentStep ? "active-dot" : ""
                  }`}
                />

                <span
                  className={`status-label ${
                    index <= currentStep ? "active-label" : ""
                  }`}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderProgressBar;
