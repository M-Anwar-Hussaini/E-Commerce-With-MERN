import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (e) => e.product === item.product
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map((curItem) =>
          item.product === curItem.product ? item : curItem
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    deleteCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (e) => e.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  },
});

export default cartSlice.reducer;
export const { setCartItem, deleteCartItem, saveShippingInfo } =
  cartSlice.actions;
