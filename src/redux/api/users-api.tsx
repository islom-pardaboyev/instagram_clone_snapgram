import { body } from "framer-motion/client";
import { api } from "./index";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (body) => ({
        url: "/api/auth/register",
        method: "POST",
        body,
      }),
    }),
    loginUser: build.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
    }),
    getUser: build.query({
      query: (name) => ({
        url: `/api/user/profile/${name}`,
      }),
    }),
    getAllUser: build.query({
      query: (limit) => ({
        url: `/api/user/all?limit=${limit}`,
      }),
    }),
    follow: build.mutation({
      query: (username) => ({
        url: `/api/user/follow/${username}`,
        method: "POST",
        header: {
          Authorization: `Bearer ${JSON.parse(
            window.localStorage.getItem("accessToken") as string
          )}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  useFollowMutation,
  useLoginUserMutation,
  useGetUserQuery,
} = productApi;
