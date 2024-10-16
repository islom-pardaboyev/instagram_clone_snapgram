import { api } from "./index";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (body) => ({
        url: "/api/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    loginUser: build.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    getUser: build.query({
      query: (name) => ({
        url: `/api/user/profile/${name}`,
      }),
      providesTags: [{ type: "User" }],
    }),
    getAllUser: build.query({
      query: () => ({
        url: `/api/user/all`,
      }),
      providesTags: [{ type: "User"  }],
    }),
    follow: build.mutation({
      query: (username) => ({
        url: `/api/user/follow/${username}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    unfollow: build.mutation({
      query: (username) => ({
        url: `/api/user/unfollow/${username}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    getFeed: build.query({
      query: () => {
        url: '/api/user/feed'
      }
    })
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  useFollowMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useUnfollowMutation,
  useGetFeedQuery
} = productApi;
