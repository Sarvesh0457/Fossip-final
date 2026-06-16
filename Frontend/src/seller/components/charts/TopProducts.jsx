import React from "react";
import "./TopCharts.css";

const TopProducts = ({ title, products = [] }) => {
  return (
    <div className="top-products">
      <div className="section-header">
        <h3>{title}</h3>
      </div>

      <div className="products-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-item" key={product.id}>
              <div className="product-left">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                <div>
                  <h4 className="product-name">{product.name}</h4>

                  <p className="product-category">{product.category}</p>
                </div>
              </div>

              <div className="product-right">
                <span className="product-sales">{product.unitsSold} sold</span>

                <span className="product-revenue">
                  ₹{Number(product.revenue).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="widget-empty">No top products available.</div>
        )}
      </div>
    </div>
  );
};

export default TopProducts;
