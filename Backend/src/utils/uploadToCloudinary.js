// src/utils/uploadToCloudinary.js

import cloudinary from "./cloudinary.js";

export const uploadToCloudinary = async (localPath) => {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder: "products",
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    throw error;
  }
};
