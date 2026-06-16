import { createContext, useContext, useEffect, useState } from "react";
import {
  addToCartApi,
  getCartApi,
  removeFromCartApi,
  clearCartApi,
  updateCartApi,
} from "../api/cart.api";

import {
  addToWishlistApi,
  getWishlistApi,
  removeWishlistApi,
} from "../api/wishlist.api";
import { useAuth } from "./AuthContext";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadWishlist();
    }
  }, [user]);

  const loadWishlist = async () => {
    if (!user) return;

    try {
      const res = await getWishlistApi();
      setWishlistItems(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await addToWishlistApi(productId);
      loadWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await removeWishlistApi(productId);
      loadWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  const moveWishlistItemToCart = async (item) => {
    try {
      await addToCartApi({
        productId: item.product._id,
        quantity: 1,
      });

      await removeWishlistApi(item.product._id);

      await fetchCart();
      await loadWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  // FETCH CART
  const fetchCart = async () => {
    if (!user) return;

    try {
      const res = await getCartApi();
      setCartItems(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  // ADD TO CART
  const addToCart = async (product, size, color) => {
    try {
      const payload = {
        productId: product._id,
        quantity: 1,
      };

      // only send size if valid
      if (size) payload.size = size;
      if (color) payload.color = color;

      await addToCartApi(payload);

      fetchCart();
    } catch (err) {
      console.log("Add to cart error:", err.response?.data || err.message);
    }
  };

  // REMOVE
  const removeFromCart = async (id) => {
    try {
      await removeFromCartApi(id);
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE QTY
  const updateCartQuantity = async (id, quantity) => {
    try {
      await updateCartApi(id, { quantity });
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  // CLEAR CART
  const clearCart = async () => {
    try {
      await clearCartApi();
      setCartItems([]);
    } catch (err) {
      console.log(err);
    }
  };

  const cartSubtotal = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        fetchCart,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        moveWishlistItemToCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
