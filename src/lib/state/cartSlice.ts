import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Types } from "mongoose";

interface CartItem {
  _id: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
  slug: string;
}

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
      state.items.push(action.payload); // Add an item to the cart
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload); // Remove an item by ID
    },
    updateQuantity(
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) {
      const item = state.items.find((i) => i._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = []; // Clear all items in the cart
    },
  },
});

// Export the actions to use them in components
export const { addToCart, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

// Export the reducer to add it to the store
export default cartSlice.reducer;
