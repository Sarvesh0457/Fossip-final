import React from "react";
import "./TopCharts.css";

const CategoryMix = ({ title, categories = [] }) => {
  return (
    <div className="category-mix">
      <div className="section-header">
        <h3>{title}</h3>
      </div>

      <div className="categories-list">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="category-item">
              <div className="category-header">
                <span className="category-name">{category.name}</span>

                <span className="category-value">{category.percentage}%</span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${category.percentage}%`,
                    background: category.color || "#2563eb",
                  }}
                />
              </div>

              <div className="category-meta">{category.orders} Orders</div>
            </div>
          ))
        ) : (
          <div className="widget-empty">No category data available.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryMix;
