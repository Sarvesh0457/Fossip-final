import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import "./filtersandtable.css";
import { getProductImageUrl } from "../../../utils/productImage";

const ProductTable = ({
  products = [],
  selectedProducts = [],
  onSelect,
  onSelectAll,
  onEdit,
  onDelete,
}) => {
  const isAllSelected =
    products.length > 0 && selectedProducts.length === products.length;

  return (
    <div className="product-table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </th>

            <th>Thumbnail</th>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => {
              const id = product._id || product.id;

              const name = product.name || "Unnamed Product";
              const variant = product.variant || "";
              const sku = product.sku || "-";
              const category = product.category || "-";

              const price =
                product.price !== undefined && product.price !== null
                  ? Number(product.price).toFixed(2)
                  : "0.00";

              const stock = product.stock !== undefined ? product.stock : 0;

              const status = product.status || "inactive";

              const image = getProductImageUrl(
                product,
                "https://via.placeholder.com/60?text=No+Image",
              );

              return (
                <tr key={id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(id)}
                      onChange={() => onSelect(id)}
                    />
                  </td>

                  <td>
                    <img
                      src={image}
                      alt={name}
                      className="table-product-image"
                    />
                  </td>

                  <td>
                    <div className="product-info">
                      <span className="table-product-name">{name}</span>

                      {variant && (
                        <span className="table-product-subtitle">
                          {variant}
                        </span>
                      )}
                    </div>
                  </td>

                  <td>{sku}</td>

                  <td>
                    <span className="category-pill">{category}</span>
                  </td>

                  <td>${price}</td>

                  <td className={stock === 0 ? "stock-zero" : ""}>{stock}</td>

                  <td>
                    <span className={`status-pill ${status}`}>
                      {(status || "").replace("-", " ")}
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button onClick={() => onEdit(product)}>
                        <Pencil size={16} />
                      </button>

                      <button onClick={() => onDelete(id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9" className="empty-products">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
