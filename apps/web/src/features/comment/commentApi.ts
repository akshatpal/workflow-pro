import { api } from "@/store/api";
import type {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
} from "./comment.types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const commentApi =
  api.injectEndpoints({
    endpoints: (builder) => ({
      getComments:
        builder.query<
          Comment[],
          string
        >({
          query: (taskId) => ({
            url: `/comments/task/${taskId}`,
          }),

          transformResponse: (
            response: ApiResponse<Comment[]> | Comment[]
          ) => {
            if ("data" in response && Array.isArray(response.data)) {
              return response.data;
            }
            return Array.isArray(response) ? response : [];
          },

          providesTags: [
            "Comment",
          ],
        }),

      createComment:
        builder.mutation<
          Comment,
          CreateCommentRequest
        >({
          query: (body) => ({
            url: "/comments",

            method: "POST",

            body,
          }),

          transformResponse: (
            response: ApiResponse<Comment> | Comment
          ) => {
            if ("data" in response && response.data) {
              return response.data;
            }
            return response as Comment;
          },

          invalidatesTags: [
            "Comment",
          ],
        }),

      updateComment:
        builder.mutation<
          Comment,
          {
            id: string;

            body: UpdateCommentRequest;
          }
        >({
          query: ({
            id,
            body,
          }) => ({
            url: `/comments/${id}`,

            method: "PATCH",

            body,
          }),

          transformResponse: (
            response: ApiResponse<Comment> | Comment
          ) => {
            if ("data" in response && response.data) {
              return response.data;
            }
            return response as Comment;
          },

          invalidatesTags: [
            "Comment",
          ],
        }),

      deleteComment:
        builder.mutation<
          void,
          string
        >({
          query: (id) => ({
            url: `/comments/${id}`,

            method: "DELETE",
          }),

          invalidatesTags: [
            "Comment",
          ],
        }),
    }),
  });

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;