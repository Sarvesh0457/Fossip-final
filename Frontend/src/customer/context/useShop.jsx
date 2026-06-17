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
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const loadWishlist = async () => {
    if (!user) return;

    try {
      const res = await getWishlistApi();
      setWishlistItems(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.log(err);
    }
  };

  const addToWishlist = async (productId) => {
    if (!user) return false;

    try {
      await addToWishlistApi(productId);
      await loadWishlist();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return false;

    try {
      await removeWishlistApi(productId);
      await loadWishlist();
      return true;
    } catch (err) {
      console.log(err);
      return false;
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
      return true;
    } catch (err) {
      console.log(err);
      return false;
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
    } else {
      setCartItems([]);
    }
  }, [user]);

  // ADD TO CART
  const addToCart = async (product, size, color) => {
    if (!user) {
      throw new Error("NOT_AUTHENTICATED");
    }

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
      return true;
    } catch (err) {
      console.log("Add to cart error:", err.response?.data || err.message);
      return false;
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
