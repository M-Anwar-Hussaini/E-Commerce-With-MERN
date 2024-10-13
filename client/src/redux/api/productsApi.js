import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Product', 'AdminProducts'], // Ensure tag type is declared
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: '/products',
        params: {
          page: params?.page,
          keyword: params?.keyword,
          'price[gte]': params.min,
          'price[lte]': params.max,
          category: params.category,
          'ratings[gte]': params.ratings,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product', id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    submitReview: builder.mutation({
      query: (body) => ({
        url: '/reviews',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Product', id: productId },
      ],
    }),
    canUserReview: builder.query({
      query: (productId) => ({
        url: `/can_review`,
        params: { productId },
      }),
      providesTags: (result, error, productId) => [
        { type: 'Product', id: productId },
      ],
    }),
    getAdminProducts: builder.query({
      query: () => `/admin/products`,
      providesTags: ['AdminProducts'],
    }),
    createProduct: builder.mutation({
      query(body) {
        return {
          url: '/admin/products',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AdminProducts'],
    }),
    updateProduct: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Product', 'AdminProducts'],
    }),
    uploadProductImages: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/upload_images`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Product'],
    }),
    deleteProductImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/delete_image`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/admin/products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['AdminProducts'],
    }),
    getProductReviews: builder.query({
      query: (id) => `/reviews?id=${id}`,
    }),
  }),
});

export default productApi;
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useSubmitReviewMutation,
  useCanUserReviewQuery,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
  useLazyGetProductReviewsQuery,
} = productApi;
