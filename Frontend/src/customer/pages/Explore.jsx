import { useState, useEffect } from "react";
import "./Explore.css";
import ProductGrid from "../components/ProductGrid.jsx";
import FilterSidebar from "../components/sidebarFilter.jsx";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../api/ProductApi";
import { useProductFilters } from "../hooks/useProductFilters.js";
import { useExploreControls } from "../hooks/useExploreControls.js";

const MIN_PRICE = 200;
const MAX_PRICE = 10000;

function Explore() {
  const { gender } = useParams();

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const {
    selectedFilters,
    appliedFilters,
    sortBy,
    setSortBy,
    toggleListFilter,
    changePrice,
    applyFilters,
    clearAll,
  } = useExploreControls();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(gender);
        
        // 1. THIS WILL TELL US EXACTLY WHAT THE BACKEND IS SENDING
        console.log("RAW BACKEND DATA:", data); 

        // 2. BULLETPROOF EXTRACTION: Checks every possible nesting level
        const fetchedProducts = data?.data?.products || data?.products || data || [];
        const fetchedFilters = data?.data?.filters || data?.filters || {};

        // 3. Safety check to ensure it only saves an array
        if (Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
        } else {
          console.error("Backend did not return an array of products!");
          setProducts([]);
        }
        
        setFilters(fetchedFilters);

      } catch (err) {
        console.error("Explore Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [gender]);

  const filteredProducts = useProductFilters(products, appliedFilters);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low-to-high") return a.price - b.price;
    if (sortBy === "high-to-low") return b.price - a.price;
    if (sortBy === "rating") return b.averageRating - a.averageRating;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const categories = filters?.categories ?? [];
  const brands = filters?.brands ?? [];
  const colors = filters?.colors ?? [];
  const [minPrice, maxPrice] = selectedFilters.price;

  if (loading) {
    return (
      <div className="explore-loading-screen">
        <div className="spinner"></div>
        <h2>Curating {gender}'s Collection...</h2>
      </div>
    );
  }

  return (
    <div className="explore-page">
      {/* Desktop Sidebar */}
      <div className="desktop-sidebar">
        <FilterSidebar
          categories={categories}
          brands={brands}
          colors={colors}
          selectedFilters={selectedFilters}
          toggleListFilter={toggleListFilter}
          changePrice={changePrice}
          MIN_PRICE={MIN_PRICE}
          MAX_PRICE={MAX_PRICE}
          minPrice={minPrice}
          maxPrice={maxPrice}
          clearAll={clearAll}
          applyFilters={applyFilters}
          products={products}
        />
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div className="filter-overlay" onClick={() => setShowFilters(false)}>
          <div className="filter-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Filters</h2>
              <button onClick={() => setShowFilters(false)}>✕</button>
            </div>

            <FilterSidebar
              categories={categories}
              brands={brands}
              colors={colors}
              selectedFilters={selectedFilters}
              toggleListFilter={toggleListFilter}
              changePrice={changePrice}
              MIN_PRICE={MIN_PRICE}
              MAX_PRICE={MAX_PRICE}
              minPrice={minPrice}
              maxPrice={maxPrice}
              clearAll={clearAll}
              applyFilters={() => {
                applyFilters();
                setShowFilters(false);
              }}
              products={products}
            />
          </div>
        </div>
      )}

      {/* Main Products Panel */}
      <main className="products-panel">
        <div className="top-row">
          <button
            className="mobile-filter-btn"
            onClick={() => setShowFilters(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filters
          </button>

          <button
            className={`sort-btn ${sortBy === "recommended" ? "active" : ""}`}
            onClick={() => setSortBy("recommended")}
          >
            Recommended
          </button>

          <button
            className={`sort-btn ${sortBy === "low-to-high" ? "active" : ""}`}
            onClick={() => setSortBy("low-to-high")}
          >
            Price ↑
          </button>

          <button
            className={`sort-btn ${sortBy === "high-to-low" ? "active" : ""}`}
            onClick={() => setSortBy("high-to-low")}
          >
            Price ↓
          </button>

          <button
            className={`sort-btn ${sortBy === "rating" ? "active" : ""}`}
            onClick={() => setSortBy("rating")}
          >
            Rating
          </button>
        </div>

        {appliedFilters.categories.length > 0 && (
          <div className="chip-row">
            {appliedFilters.categories.map((item) => (
              <button key={item} onClick={() => toggleListFilter("categories", item)}>
                {item} ✕
              </button>
            ))}
          </div>
        )}

        {/* The Grid Component */}
        <div className="grid-container">
          <ProductGrid products={sortedProducts} />
        </div>
      </main>
    </div>
  );
}

export default Explore;