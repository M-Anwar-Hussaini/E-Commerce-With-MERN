import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice";

import productApi from "./api/productsApi";
import authApi from "./api/authApi";
import userApi from "./api/userApi";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ),
});
