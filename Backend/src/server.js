import dotenv from "dotenv";

// Fallback to local .env only if not running in production
if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: "./.env",
  });
} else {
  dotenv.config(); // Render injects variables natively, this handles standard fallbacks
}

import connectDB from "./db/index.js";
import userRouter from "./routes/user.routes.js";
import sellerRouter from "./routes/seller.routes.js";
import authRouter from "./routes/auth.routes.js";
import { razorpay } from "./utils/razorpay.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import reviewRouter from "./routes/review.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import paymentRouter from "./routes/payment.routes.js";

import express from "express";
const app = express();

// middleware
app.use(cookieParser());
app.use(express.json());

// Dynamic CORS configuration
const allowedOrigins = [
  "http://localhost:5173",          // Local React development
  process.env.FRONTEND_URL          // Your live Render React URL
].filter(Boolean);                  // Removes undefined values if FRONTEND_URL isn't set yet

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/seller", sellerRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/payment", paymentRouter);

// Connection (Fallback port 10000 ensures Render can assign a port if process.env.PORT is blank)
const port = process.env.PORT || 10000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });