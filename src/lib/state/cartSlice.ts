import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cart"; // adjust if path differs
// import { set, Types } from "mongoose";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [], // Start with an empty cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      console.log("🛒 Checking existing items against:", action.payload);

      const existingItem = state.items.find(
        (item) =>
          item._id === action.payload._id &&
          item.dimensions === action.payload.dimensions
      );

      if (existingItem) {
        console.log("✅ Found matching item. Increasing quantity.");
        existingItem.quantity += action.payload.quantity;
      } else {
        console.log("🆕 New size. Adding to cart.");
        state.items.push(action.payload);
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ _id: string; dimensions: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item._id === action.payload._id &&
            item.dimensions === action.payload.dimensions
          )
      ); // Remove an item by ID
    },
    updateCartQuantity(
      state,
      action: PayloadAction<{
        _id: string;
        quantity: number;
        dimensions: string;
      }>
    ) {
      const item = state.items.find(
        (i) =>
          i._id === action.payload._id &&
          i.dimensions === action.payload.dimensions
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = []; // Clear all items in the cart
    },

    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

// Export the actions to use them in components
export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  setCart,
} = cartSlice.actions;

// Export the reducer to add it to the store
export default cartSlice.reducer;
