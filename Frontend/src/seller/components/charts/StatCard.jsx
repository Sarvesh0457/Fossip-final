import React from "react";

const StatCard = ({ title, value, growth, icon: Icon, growthType }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div>
          <p className="stat-title">{title}</p>

          <h3 className="stat-value">{value}</h3>

          {growth && (
            <span
              className={`stat-growth ${
                growthType === "negative" ? "negative" : "positive"
              }`}
            >
              {growth}
            </span>
          )}
        </div>

        <div className="stat-icon">{Icon && <Icon size={22} />}</div>
      </div>
    </div>
  );
};

export default StatCard;
