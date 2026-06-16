import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";
import { useShop } from "../context/useShop";

const API = import.meta.env.VITE_API_URL || "/api/v1";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeMessage, setPincodeMessage] = useState("");
  const [openSection, setOpenSection] = useState("description");

  // optional: connect later to cart context
  const { addToCart } = useShop();
  const isWishlisted = () => false;
  const toggleWishlist = () => {};

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.log("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="product-not-found">Loading...</p>;
  if (!product) return <p className="product-not-found">Product not found</p>;

  const imageUrl = product.images?.[0]?.url;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart(product, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize);
    navigate("/cart");
  };

  const checkPincode = () => {
    if (pincode.length !== 6) {
      setPincodeMessage("Enter valid 6 digit pincode");
      return;
    }
    setPincodeMessage(`Delivery in ${product.deliveryTime || "3-5 days"}`);
  };

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? "" : section));
  };

  const isWishlistedItem = isWishlisted(product._id);

  return (
    <main className="product-detail-page">
      <section className="product-detail-container">
        {/* LEFT */}
        <div className="product-left">
          <div className="detail-image-box">
            <img src={imageUrl} alt={product.name} />
          </div>

          <div className="detail-actions">
            <button className="cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <button className="buy-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="product-right">
          <div className="product-summary-card">
            <div className="product-title-row">
              <div>
                <h1>{product.brand}</h1>
                <p className="detail-product-name">{product.name}</p>
              </div>

              <button
                className={`heart-btn ${isWishlistedItem ? "active" : ""}`}
                onClick={() => toggleWishlist(product)}
              >
                {isWishlistedItem ? "♥" : "♡"}
              </button>
            </div>

            <div className="price-row">
              <strong>₹{product.discountedPrice || product.price}</strong>

              {product.discountedPrice && (
                <span className="mrp">₹{product.price}</span>
              )}
            </div>

            <p className="tax-text">Inclusive of all taxes</p>

            {/* SIZE */}
            <div className="size-section">
              <h2>Select Size</h2>

              <div className="size-options">
                {(product.size || []).map((s) => (
                  <button
                    key={s}
                    className={selectedSize === s ? "selected" : ""}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PINCODE */}
          <section className="pincode-card">
            <h2>Check Delivery</h2>

            <div className="pincode-row">
              <input
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                placeholder="Enter pincode"
              />

              <button onClick={checkPincode}>Check</button>
            </div>

            {pincodeMessage && (
              <p className="pincode-message">{pincodeMessage}</p>
            )}
          </section>

          {/* DETAILS */}
          <section className="highlights-card">
            <h2>Product Details</h2>

            <div className="info-accordion">
              <div className="info-item">
                <button onClick={() => toggleSection("description")}>
                  DESCRIPTION
                  <strong>{openSection === "description" ? "-" : "+"}</strong>
                </button>

                {openSection === "description" && (
                  <div className="info-content">
                    <p>{product.description}</p>
                  </div>
                )}
              </div>

              <div className="info-item">
                <button onClick={() => toggleSection("materials")}>
                  MATERIALS
                  <strong>{openSection === "materials" ? "-" : "+"}</strong>
                </button>

                {openSection === "materials" && (
                  <div className="info-content">
                    <p>Fabric: {product.fabric || "Not specified"}</p>
                    <p>Color: {product.color?.join(", ") || "Not specified"}</p>
                  </div>
                )}
              </div>

              <div className="info-item">
                <button onClick={() => toggleSection("delivery")}>
                  DELIVERY
                  <strong>{openSection === "delivery" ? "-" : "+"}</strong>
                </button>

                {openSection === "delivery" && (
                  <div className="info-content">
                    <p>Delivery Time: {product.deliveryTime}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
