import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cardItems")
    ? JSON.parse(localStorage.getItem("cardItems"))
    : [],
};
const cartSlice = createSlice({
  name: "carSlice",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (e) => e.product === item.product,
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map((curItem) =>
          item.product === curItem.product ? item : curItem,
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem("cardItems", JSON.stringify(state.cartItems));
    },
    deleteCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (e) => e.product !== action.payload,
      );
    },
  },
});

export default cartSlice.reducer;
export const { setCartItem, deleteCartItem } = cartSlice.actions;
