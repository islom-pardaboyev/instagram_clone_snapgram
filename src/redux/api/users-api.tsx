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
    loginUser: build.mutation({
      query: (body) => ({
        url: '/api/auth/login',
        method: 'POST',
        body
      })
    })
  }),
})

export const {
  useCreateUserMutation,
  useLoginUserMutation
} = productApi