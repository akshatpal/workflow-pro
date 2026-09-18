import { api } from "@/store/api";
import type { Attachment } from "./attachment.types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const attachmentApi =
  api.injectEndpoints({
    endpoints: (builder) => ({
      getAttachments:
        builder.query<
          Attachment[],
          string
        >({
          query: (taskId) => ({
            url: `/attachments/task/${taskId}`,
          }),

          transformResponse: (
            response: ApiResponse<Attachment[]> | Attachment[]
          ) => {
            if ("data" in response && Array.isArray(response.data)) {
              return response.data;
            }
            return Array.isArray(response) ? response : [];
          },

          providesTags: [
            "Attachment",
          ],
        }),

      uploadAttachment:
        builder.mutation<
          Attachment,
          FormData
        >({
          query: (body) => ({
            url: "/attachments",

            method: "POST",

            body,
          }),

          transformResponse: (
            response: ApiResponse<Attachment> | Attachment
          ) => {
            if ("data" in response && response.data) {
              return response.data;
            }
            return response as Attachment;
          },

          invalidatesTags: [
            "Attachment",
            "Task",
          ],
        }),

      deleteAttachment:
        builder.mutation<
          void,
          string
        >({
          query: (id) => ({
            url: `/attachments/${id}`,

            method: "DELETE",
          }),

          invalidatesTags: [
            "Attachment",
            "Task",
          ],
        }),
    }),
  });

export const {
  useGetAttachmentsQuery,
  useUploadAttachmentMutation,
  useDeleteAttachmentMutation,
} = attachmentApi;