import React from "react";
import "./PaginationandSKUcardsndinventory.css";
const SKUCard = ({ totalSku, warehouseCapacity }) => {
  return (
    <div className="sku-card">
      <span className="card-label">Total SKU Count</span>

      <h2 className="sku-value">{totalSku}</h2>

      <div className="capacity-header">
        <span>Warehouse Capacity</span>

        <span>{warehouseCapacity}%</span>
      </div>

      <div className="capacity-bar">
        <div
          className="capacity-fill"
          style={{
            width: `${warehouseCapacity}%`,
          }}
        />
      </div>
    </div>
  );
};

export default SKUCard;
