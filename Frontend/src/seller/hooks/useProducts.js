// src/seller/hooks/useProducts.js

import { useEffect, useState } from "react";
import { productService } from "../services/productService";

const useProducts = () => {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [products, setProducts] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const [stats, setStats] = useState({
    inventoryValue: 0,
    inventoryGrowth: 0,
    totalSku: 0,
    warehouseCapacity: 0,
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const [filters, setFilters] = useState({
    category: "",
    status: "",
    brand: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await productService.getProducts();

      const productList = response.data.products || [];

      setProducts(productList);

      setStats({
        inventoryValue: productList.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0,
        ),

        inventoryGrowth: 0,

        totalSku: productList.length,

        warehouseCapacity: productList.reduce(
          (sum, product) => sum + product.quantity,
          0,
        ),
      });

      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: productList.length,
        itemsPerPage: 10,
      });
    } catch (err) {
      setError(err.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      status: "",
      brand: "",
    });
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(products.map((product) => product._id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleEditProduct = (product) => {
    console.log("Edit Product:", product);

    // navigate(`/seller/products/edit/${product._id}`);
  };

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      await productService.deleteProduct(productId);

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId),
      );

      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleAddProduct = () => {
    console.log("Navigate to Add Product");

    // navigate("/seller/products/create");
  };

  return {
    loading,
    error,

    products,

    filters,
    setFilters,
    clearFilters,

    stats,

    pagination,

    selectedProducts,

    handleSelectProduct,
    handleSelectAll,

    handleEditProduct,
    handleDeleteProduct,

    handlePageChange,

    handleAddProduct,

    refreshProducts: fetchProducts,
  };
};

export default useProducts;
