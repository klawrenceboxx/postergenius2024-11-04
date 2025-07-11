import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  expanded: [] as string[], // Array of expanded item IDs
  expandedAll: false, // Flag to indicate if all items are expanded
};
