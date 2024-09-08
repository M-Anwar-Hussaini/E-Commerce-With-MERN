import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          "price[gte]": params.min,
          "price[lte]": params.max,
          category: params.category,
          "ratings[gte]": params.ratings,
        },
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
    }),
    submitReview: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export default productApi;
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useSubmitReviewMutation,
} = productApi;
