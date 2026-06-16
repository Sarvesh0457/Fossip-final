// src/seller/pages/Products.jsx

import React, { useState } from "react";
import { Plus } from "lucide-react";

import "./products.css";

import ProductFilters from "../components/products/ProductFilters";
import ProductTable from "../components/products/ProductTable";
import InventoryCard from "../components/products/InventoryCard";
import SKUCard from "../components/products/SKUCard";
import Pagination from "../components/products/Pagination";
import CreateProductCard from "../components/CreateProductCard";

import useProducts from "../hooks/useProducts";
import useCreateProduct from "../hooks/useCreateProduct";

const Products = () => {
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  const {
    loading,
    error,

    products,
    filters,
    stats,
    pagination,

    setFilters,
    clearFilters,

    selectedProducts,
    handleSelectProduct,
    handleSelectAll,

    handleEditProduct,
    handleDeleteProduct,

    handlePageChange,

    refreshProducts,
  } = useProducts();

  const {
    product,
    loading: creatingProduct,
    handleInputChange,
    createProduct,
  } = useCreateProduct();

  const handleCreateProduct = async () => {
    const success = await createProduct();

    if (success) {
      setShowCreateProduct(false);

      await refreshProducts();

      alert("Product created successfully!");
    }
  };

  if (loading) {
    return <div className="products-loading">Loading products...</div>;
  }

  if (error) {
    return <div className="products-error">{error}</div>;
  }

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-toolbar">
        <ProductFilters
          filters={filters}
          onChange={setFilters}
          onClear={clearFilters}
        />

        <button
          className="add-product-btn"
          onClick={() => setShowCreateProduct(true)}
        >
          <Plus size={18} />

          <span>Add Product</span>
        </button>
      </div>

      {/* Create Product Card */}
      {showCreateProduct && (
        <CreateProductCard
          product={product}
          onInputChange={handleInputChange}
          onCreateProduct={handleCreateProduct}
          loading={creatingProduct}
        />
      )}

      {/* Product Table */}
      <div className="products-card">
        <ProductTable
          products={products}
          selectedProducts={selectedProducts}
          onSelect={handleSelectProduct}
          onSelectAll={handleSelectAll}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Stats */}
      <div className="products-stats">
        <InventoryCard
          value={stats.inventoryValue}
          growth={stats.inventoryGrowth}
        />

        <SKUCard
          totalSku={stats.totalSku}
          warehouseCapacity={stats.warehouseCapacity}
        />
      </div>
    </div>
  );
};

export default Products;
