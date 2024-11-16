import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
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
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload); // Add an item to the cart
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload); // Remove an item by ID
    },
    clearCart: (state) => {
      state.items = []; // Clear all items in the cart
    },
  },
});

// Export the actions to use them in components
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Export the reducer to add it to the store
export default cartSlice.reducer;
