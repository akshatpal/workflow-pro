import { api } from "@/store/api";
import type {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
} from "./comment.types";

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