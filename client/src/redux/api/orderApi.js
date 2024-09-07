import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: `/orders`,
          method: "POST",
          body,
        };
      },
    }),
    myOrders: builder.query({
      query: () => `/orders/me`,
    }),
    orderDetails: builder.query({
      query: (id) => `/orders/${id}`,
    }),
    stripeCheckoutSession: builder.mutation({
      query: (body) => ({
        url: "/payments/checkout_stripe",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
  useMyOrdersQuery,
  useOrderDetailsQuery,
} = orderApi;
