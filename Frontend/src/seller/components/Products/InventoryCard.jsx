import React from "react";
import { TrendingUp, Wallet } from "lucide-react";
import "./PaginationandSKUcardsndinventory.css";

const InventoryCard = ({ value, growth }) => {
  return (
    <div className="inventory-card">
      <div>
        <span className="card-label">Inventory Value</span>

        <h2 className="inventory-value">{value}</h2>

        <div className="inventory-growth">
          <TrendingUp size={16} />

          <span>{growth} Increase from last month</span>
        </div>
      </div>

      <div className="inventory-icon">
        <Wallet size={52} />
      </div>
    </div>
  );
};

export default InventoryCard;
