import React from "react";
import { FilterX } from "lucide-react";
import "./filtersandtable.css";

const ProductFilters = ({ filters, onChange, onClear }) => {
  const handleFilterChange = (key, value) => {
    onChange((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="product-filters">
      <select
        value={filters.category}
        onChange={(e) => handleFilterChange("category", e.target.value)}
      >
        <option value="">Category: All</option>

        <option value="apparel">Apparel</option>

        <option value="footwear">Footwear</option>

        <option value="accessories">Accessories</option>

        <option value="outerwear">Outerwear</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
      >
        <option value="">Status: All</option>

        <option value="active">Active</option>

        <option value="draft">Draft</option>

        <option value="out-of-stock">Out Of Stock</option>
      </select>

      <select
        value={filters.brand}
        onChange={(e) => handleFilterChange("brand", e.target.value)}
      >
        <option value="">Brand: All</option>

        <option value="luxury">Luxury</option>

        <option value="premium">Premium</option>

        <option value="casual">Casual</option>
      </select>

      <button className="clear-filter-btn" onClick={onClear}>
        <FilterX size={16} />
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFilters;
