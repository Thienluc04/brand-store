import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Cart } from "models";

export interface CartState {
  length: number;
}

const initialState: CartState = {
  length: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartLength(state, action: PayloadAction<number>) {
      state.length = action.payload;
    },
  },
});

// Actions
export const cartAction = cartSlice.actions;

// Selectors
export const selectCartLength = (state: RootState) => state.cart.length;

// Reducer
const cartReducer = cartSlice.reducer;
export default cartReducer;
