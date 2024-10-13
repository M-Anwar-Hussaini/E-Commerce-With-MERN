import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: `/orders`,
          method: 'POST',
          body,
        };
      },
    }),
    myOrders: builder.query({
      query: () => `/orders/me`,
    }),
    orderDetails: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ['Orders'],
    }),
    stripeCheckoutSession: builder.mutation({
      query: (body) => ({
        url: '/payments/checkout_stripe',
        method: 'POST',
        body,
      }),
    }),
    getDashboardSales: builder.query({
      query: ({ startDate, endDate }) =>
        `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
    }),
    adminOrderList: builder.query({
      query: () => `/admin/orders`,
      providesTags: ['Orders'],
    }),
    updateOrder: builder.mutation({
      query({ body, id }) {
        return {
          url: `/admin/orders/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Orders'],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
  useMyOrdersQuery,
  useOrderDetailsQuery,
  useLazyGetDashboardSalesQuery,
  useAdminOrderListQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
