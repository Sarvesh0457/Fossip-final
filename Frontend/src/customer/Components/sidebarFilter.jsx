import "./sidebarFilter.css";

function FilterSidebar({
  categories,
  brands,
  colors,
  selectedFilters,
  toggleListFilter,
  changePrice,
  MIN_PRICE,
  MAX_PRICE,
  minPrice,
  maxPrice,
  clearAll,
  applyFilters,
  products,
}) {
  const minPercent = ((minPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const maxPercent = ((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h2>FILTERS</h2>
        <button type="button" onClick={clearAll}>
          CLEAR ALL
        </button>
      </div>

      {/* CATEGORIES */}
      <section className="filter-block">
        <h3>CATEGORIES</h3>
        {categories.map((category) => (
          <label className="filter-check" key={category}>
            <input
              type="checkbox"
              checked={(selectedFilters.categories || []).includes(category)}
              onChange={() => toggleListFilter("categories", category)}
            />
            <span>
              {typeof category === "object" ? category.name : category}
            </span>
            <small>
              ({products.filter((p) => p.category === category).length})
            </small>
          </label>
        ))}
      </section>

      {/* BRANDS */}
      <section className="filter-block">
        <h3>BRAND</h3>
        {brands.map((brand) => (
          <label className="filter-check" key={brand}>
            <input
              type="checkbox"
              checked={(selectedFilters.brands || []).includes(brand)}
              onChange={() => toggleListFilter("brands", brand)}
            />
            <span> {typeof brand === "object" ? brand.name : brand}</span>
          </label>
        ))}
      </section>

      {/* PRICE */}
      <section className="filter-block">
        <h3>PRICE</h3>

        <div className="price-slider">
          <div className="price-track"></div>
          <div
            className="price-fill"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            }}
          ></div>

          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step="100"
            value={minPrice}
            onChange={(e) => changePrice(0, e.target.value)}
          />

          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step="100"
            value={maxPrice}
            onChange={(e) => changePrice(1, e.target.value)}
          />
        </div>
      </section>

      {/* COLORS */}
      <section className="filter-block">
        <h3>COLOR</h3>
        {colors.map((color) => (
          <label className="filter-check" key={color}>
            <input
              type="checkbox"
              checked={(selectedFilters.colors || []).includes(color)}
              onChange={() => toggleListFilter("colors", color)}
            />
            <span> {typeof color === "object" ? color.name : color}</span>
          </label>
        ))}
      </section>

      <button className="apply-btn" onClick={applyFilters}>
        Apply Filters
      </button>
    </aside>
  );
}

export default FilterSidebar;
