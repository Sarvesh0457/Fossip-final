import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getSellerOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = Router();

router.post("/", verifyJWT, createOrder);
router.get("/my-orders", verifyJWT, getMyOrders);
router.get("/seller-orders", verifyJWT, getSellerOrders);

// must always be last
router.get("/:id", verifyJWT, getOrderById);

router.patch(
  "/:id/status",
  verifyJWT,
  authorizeRoles("seller"),
  updateOrderStatus,
);
export default router;
