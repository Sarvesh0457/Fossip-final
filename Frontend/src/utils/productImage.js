const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300?text=No+Image";

export const getProductImageUrl = (product, fallback = PLACEHOLDER_IMAGE) => {
  const firstImage = Array.isArray(product?.images) ? product.images[0] : null;
  const image = product?.image || firstImage;

  if (!image) return fallback;

  if (typeof image === "string") return image;

  return image.url || image.secure_url || image.path || fallback;
};

export { PLACEHOLDER_IMAGE };
