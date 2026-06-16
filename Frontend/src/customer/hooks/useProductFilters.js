import { useMemo } from "react";

export function useProductFilters(products, appliedFilters) {
  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = appliedFilters.price;

    return products.filter((product) => {
      const categoryMatch =
        appliedFilters.categories.length === 0 ||
        appliedFilters.categories.includes(product.category);

      const brandMatch =
        appliedFilters.brands.length === 0 ||
        appliedFilters.brands.includes(product.brand);

      const colorMatch =
        appliedFilters.colors.length === 0 ||
        appliedFilters.colors.includes(product.color);

      const priceMatch = product.price >= minPrice && product.price <= maxPrice;

      const topMatch = Object.entries(appliedFilters.dropdowns || {}).every(
        ([key, values]) => !values?.length || values.includes(product[key]),
      );

      return (
        categoryMatch && brandMatch && colorMatch && priceMatch && topMatch
      );
    });
  }, [products, appliedFilters]);
  return filteredProducts;
}
