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
      providesTags: ["User"],
    }),
    getAllUser: build.query({
      query: () => ({
        url: `/api/user/all?limit=3000`,
      }),
      providesTags: ["User"],
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
      query: () => ({
        url: "/api/user/feed?limit=3000",
      }),
      providesTags: ["User"],
    }),
    createPost: build.mutation({
      query: (body) => ({
        url: "/api/post",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    uploadFiles: build.mutation({
      query: (body) => ({
        url: '/api/upload/files',
        method: "POST",
        body
      }),
      invalidatesTags: [{ type: "User" }]
    }),
    getAllPostByUser: build.query({
      query: (username) => ({
        url: `/api/post/${username}`
      }),
      providesTags: ["User"],
    }),
    getSinglePost: build.query<{ data: any }, { username: string; post_id: string }>({
      query: ({ username, post_id }) => ({
        url: `/api/post/${username}/${post_id}`,
      }),
      providesTags: ['User']
    }),
    deletePost: build.mutation({
      query:(id) => ({
        url: `/api/post/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['User']
    }),
    likePost: build.mutation({
      query:(postID) => ({
        url: `/api/post/${postID}/like`,
        method: 'POST'
      }),
      invalidatesTags: [{type: 'User'}]
    }),
    postComment: build.mutation({
      query: (data) => ({
        url: `/api/comment/${data.postId}`,
        method: 'POST',
        body: data.body,
      }),
      invalidatesTags: ['User']
    }),
    getAllCommentPost: build.query({
      query:() => ({
        url: `/api/comment`
      }),
    }),
    getCurrentUserDatas: build.query({
      query:() => ({
        url: '/api/user/profile',
      })
    }),
    updateUser: build.mutation({
      query:(body) => ({
        url:'/api/user/profile',
        method: "PUT",
        body
      }),
      invalidatesTags: [{type: 'User'}]
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
  useGetFeedQuery,
  useCreatePostMutation,
  useUploadFilesMutation,
  useGetAllPostByUserQuery,
  useGetSinglePostQuery,
  useDeletePostMutation,
  useLikePostMutation,
  usePostCommentMutation,
  useGetAllCommentPostQuery,
  useGetCurrentUserDatasQuery,
  useUpdateUserMutation
} = productApi;
