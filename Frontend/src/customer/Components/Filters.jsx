import "./sidebarFilter.css";

function Filters({
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
        <h2>Filters</h2>
        <button onClick={clearAll}>Clear All</button>
      </div>

      {/* CATEGORY */}
      <section>
        <h3>Categories</h3>
        {categories.map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              checked={selectedFilters.categories.includes(item)}
              onChange={() => toggleListFilter("categories", item)}
            />
            {item}
            <small>
              ({products.filter((p) => p.category === item).length})
            </small>
          </label>
        ))}
      </section>

      {/* BRAND */}
      <section>
        <h3>Brands</h3>
        {brands.map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              checked={selectedFilters.brands.includes(item)}
              onChange={() => toggleListFilter("brands", item)}
            />
            {item}
          </label>
        ))}
      </section>

      {/* PRICE */}
      <section>
        <h3>Price</h3>

        <div className="price-slider">
          <div
            className="price-fill"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            }}
          />

          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={minPrice}
            onChange={(e) => changePrice(0, e.target.value)}
          />

          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={maxPrice}
            onChange={(e) => changePrice(1, e.target.value)}
          />
        </div>
      </section>

      {/* COLORS */}
      <section>
        <h3>Colors</h3>
        {colors.map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              checked={selectedFilters.colors.includes(item)}
              onChange={() => toggleListFilter("colors", item)}
            />
            {item}
          </label>
        ))}
      </section>

      <button onClick={applyFilters}>Apply Filters</button>
    </aside>
  );
}

export default Filters;
