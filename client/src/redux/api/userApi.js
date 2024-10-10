import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setLoading, setUser } from '../features/userSlice';

const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['User'],
  reducerPath: 'userApi',
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => '/me',
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
          console.log(error);
        }
      },
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query(body) {
        return {
          url: '/me/update',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
    uploadAvatar: builder.mutation({
      query: (body) => ({
        url: '/me/upload_avatar',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        method: 'PUT',
        body,
        url: '/password/update',
      }),
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: '/password/forgot',
          method: 'POST',
          body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query({ token, body }) {
        return {
          url: `/password/reset/${token}`,
          method: 'PUT',
          body,
        };
      },
    }),
    listAllUsers: builder.query({
      query: () => '/admin/users',
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/users/${id}`,
        method: 'PUT',
        body,
      }),

      invalidatesTags: ['User'],
    }),
    getUserDetails: builder.query({
      query: (id) => `/admin/users/${id}`,
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useListAllUsersQuery,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} = userApi;
export default userApi;
