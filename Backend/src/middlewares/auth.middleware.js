import jwt from "jsonwebtoken";

import { User } from "../models/User.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(new ApiError(401, "Unauthorised request"));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    if (!user) {
      return next(new ApiError(401, "Token invalid"));
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    next(error);
  }
});
