import crypto from "crypto";

import { razorpay } from "../utils/razorpay.js";

import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

// CREATE RAZORPAY ORDER

// const createPaymentOrder = asyncHandler(async (req, res) => {
//   const { amount } = req.body;

//   if (!amount || amount <= 0) {
//     throw new ApiError(400, "Valid amount is required");
//   }

//   const options = {
//     amount: amount * 100, // rupees → paise
//     currency: "INR",
//     receipt: `receipt_${Date.now()}`,
//   };

//   const order = await razorpay.orders.create(options);

//   return res
//     .status(200)
//     .json(new ApiResponse(200, order, "Payment order created successfully"));
// });

const createPaymentOrder = asyncHandler(async (req, res) => {
  console.log("====== INSIDE createPaymentOrder ======");
  console.log("req.user =", req.user);

  const { amount } = req.body;

  console.log("amount =", amount);

  if (!amount || amount <= 0) {
    throw new ApiError(400, "Valid amount is required");
  }

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    console.log("Creating Razorpay order...");
    const order = await razorpay.orders.create(options);

    console.log("Order created successfully");
    console.log(order);

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Payment order created successfully"));
  } catch (error) {
    console.log("FULL ERROR:");
    console.dir(error, { depth: null });

    throw error;
  }

  console.log("Order created successfully");
  console.log(order);

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Payment order created successfully"));
});

// VERIFY PAYMENT

const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (!isAuthentic) {
    throw new ApiError(400, "Payment verification failed");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      },
      "Payment verified successfully",
    ),
  );
});

export { createPaymentOrder, verifyPayment };
