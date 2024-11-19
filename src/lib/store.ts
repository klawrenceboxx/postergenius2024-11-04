import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./state/cartSlice"; // Import your slice reducers

// Function to create a new store instance
export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer, // Add the cart slice
    },
  });
};

// Infer types for the store
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
