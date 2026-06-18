import { User } from "../models/User.js";
import { SellerProfile } from "../models/SellerProfile.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

// GET CURRENT USER (PROFILE) ------------------------

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

// UPDATE PROFILE (NOT PASSWORD) ------------------------
const updateProfile = asyncHandler(async (req, res) => {
  try {
    const { fullName, phoneNumber, address, imageURL } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Basic Information
    if (fullName !== undefined) {
      user.fullName = fullName;
    }

    if (phoneNumber !== undefined) {
      user.phoneNumber = phoneNumber;
    }

    // Address
    if (address) {
      user.address = {
        ...user.address,
        ...address,
      };
    }

    // Avatar
    if (imageURL) {
      user.avatar = {
        ...user.avatar,
        url: imageURL,
      };
    }

    await user.save({
      validateBeforeSave: false,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Profile updated successfully"));
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists",
      });
    }

    throw error;
  }
});
// DELETE OWN ACCOUNT ------------------------

const deleteAccount = asyncHandler(async (req, res) => {
  await SellerProfile.deleteOne({ user: req.user._id });
  await User.findByIdAndDelete(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Account deleted successfully"));
});

export { getCurrentUser, updateProfile, deleteAccount };
