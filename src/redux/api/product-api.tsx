import { api } from './index'

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (body)=> ({
        url:"/api/auth/register",
        method: "POST",
        body
      }),
      invalidatesTags: ["Register"]
    }),
  }),
})

export const {
  useCreateUserMutation,
} = productApi