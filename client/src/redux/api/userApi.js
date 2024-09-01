import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setLoading, setUser } from "../features/userSlice";

const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["User"],
  reducerPath: "userApi",
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/me",
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
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/me/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    uploadAvatar: builder.mutation({
      query: (body) => ({
        url: "/me/upload_avatar",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        method: "PUT",
        body,
        url: "/password/update",
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
} = userApi;
export default userApi;
