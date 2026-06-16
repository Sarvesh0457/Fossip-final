// import "./Payment.css";
// import { useShop } from "../context/useShop";
// import { createPaymentOrderApi, verifyPaymentApi } from "../api/payment.api";
// import { createOrderApi } from "../api/order.api";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Payment() {
//   const navigate = useNavigate();
//   const { cartSubtotal } = useShop();
//   const { token } = useAuth();

//   const handlePayment = async () => {
//     if (!token || token === "undefined" || token === "null") {
//       alert("Please login before making a payment");
//       navigate("/login");
//       return;
//     }

//     try {
//       // create razorpay order
//       const res = await createPaymentOrderApi(cartSubtotal);

//       const order = res.data.data;

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,

//         amount: order.amount,

//         currency: order.currency,

//         name: "FOSSIP",

//         description: "Order Payment",

//         order_id: order.id,

//         handler: async function (response) {
//           try {
//             // verify payment
//             await verifyPaymentApi(response);

//             await createOrderApi({
//               paymentId: response.razorpay_payment_id,
//               razorpayOrderId: response.razorpay_order_id,
//             });

//             alert("Payment successful");

//             navigate("/orders");
//           } catch (err) {
//             console.log(err);
//             alert("Payment verification failed");
//           }
//         },

//         theme: {
//           color: "#cddc39",
//         },
//       };

//       const razor = new window.Razorpay(options);

//       razor.open();
//     } catch (err) {
//       console.log("failed errr", err);
//       alert("Payment failed");
//     }
//   };

//   return (
//     <main className="payment-page">
//       <div className="payment-card">
//         <h1>Checkout</h1>

//         <div className="payment-row">
//           <span>Total Amount</span>

//           <strong>₹{cartSubtotal}</strong>
//         </div>

//         <button className="pay-btn" onClick={handlePayment}>
//           Pay Now
//         </button>
//       </div>
//     </main>
//   );
// }

// export default Payment;

import "./Payment.css";
import { useState } from "react";
import { useShop } from "../context/useShop";
import { createOrderApi } from "../api/order.api";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const { cartSubtotal } = useShop();

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const downloadReceipt = () => {
    const receipt = `
========== FOSSIP RECEIPT ==========
Date: ${new Date().toLocaleString()}

Payment Method: ${
      paymentMethod === "card" ? "Card Payment" : "Cash On Delivery"
    }

Total Amount: ₹${cartSubtotal}

Order Status: Confirmed

Thank you for shopping with FOSSIP ❤️
===================================
`;

    const blob = new Blob([receipt], {
      type: "text/plain",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "receipt.txt";

    a.click();

    window.URL.revokeObjectURL(url);
  };

  const handlePayment = async () => {
    try {
      if (paymentMethod === "card") {
        if (!cardNumber || !cardName || !expiry || !cvv) {
          alert("Please fill all card details");
          return;
        }
      }

      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2500));

      await createOrderApi({
        paymentId:
          paymentMethod === "card" ? `demo_payment_${Date.now()}` : null,

        razorpayOrderId:
          paymentMethod === "card" ? `demo_order_${Date.now()}` : null,
      });

      setLoading(false);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Failed to place order");
    }
  };

  return (
    <main className="payment-page">
      <div className="payment-card">
        <h1>Checkout</h1>

        <div className="payment-row">
          <span>Total Amount</span>
          <strong>₹{cartSubtotal}</strong>
        </div>

        <div className="payment-methods">
          <label>
            <input
              type="radio"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Card Payment
          </label>

          <label>
            <input
              type="radio"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash On Delivery
          </label>
        </div>

        {paymentMethod === "card" && (
          <>
            <input
              className="payment-input"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <input
              className="payment-input"
              placeholder="Card Holder Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />

            <div className="payment-small-row">
              <input
                className="payment-input"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />

              <input
                className="payment-input"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </>
        )}

        <button className="pay-btn" onClick={handlePayment} disabled={loading}>
          {loading
            ? "Processing..."
            : paymentMethod === "card"
              ? "Pay Now"
              : "Place Order"}
        </button>

        {success && (
          <div className="success-box">
            <h2>✅ Payment Successful</h2>

            <p>Your order has been placed successfully.</p>

            <button className="receipt-btn" onClick={downloadReceipt}>
              Download Receipt
            </button>

            <button className="orders-btn" onClick={() => navigate("/orders")}>
              View Orders
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Payment;
