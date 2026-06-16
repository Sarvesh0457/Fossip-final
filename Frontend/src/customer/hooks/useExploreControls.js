import { useState } from "react";

const MIN_PRICE = 200;
const MAX_PRICE = 10000;

const defaultFilters = {
  categories: [],
  gender: [],
  colors: [],
  brands: [],
  price: [MIN_PRICE, MAX_PRICE],
  dropdowns: {},
};

export function useExploreControls() {
  const [selectedFilters, setSelectedFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState("recommended");

  // ---------------- TOGGLE FILTER ----------------
  const toggleListFilter = (type, value) => {
    setSelectedFilters((prev) => {
      const list = prev[type] || [];
      const exists = list.includes(value);

      return {
        ...prev,
        [type]: exists ? list.filter((i) => i !== value) : [...list, value],
      };
    });
  };

  // ---------------- PRICE ----------------
  const changePrice = (index, value) => {
    const numberValue = Number(value);

    setSelectedFilters((prev) => {
      const next = [...prev.price];

      if (index === 0) {
        next[0] = Math.min(numberValue, next[1] - 100);
      } else {
        next[1] = Math.max(numberValue, next[0] + 100);
      }

      return { ...prev, price: next };
    });
  };

  // ---------------- APPLY / CLEAR ----------------
  const applyFilters = () => setAppliedFilters(selectedFilters);

  const clearAll = () => {
    setSelectedFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  return {
    selectedFilters,
    appliedFilters,
    sortBy,
    setSortBy,
    toggleListFilter,
    changePrice,
    applyFilters,
    clearAll,
  };
}
