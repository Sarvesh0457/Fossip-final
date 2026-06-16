import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  getCurrentUser,
  updateProfile,
  deleteAccount,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/me", verifyJWT, getCurrentUser);

router.patch("/update-profile", verifyJWT, updateProfile);

router.delete("/delete-account", verifyJWT, deleteAccount);

export default router;
