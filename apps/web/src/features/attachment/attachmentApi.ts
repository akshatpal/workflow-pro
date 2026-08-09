import { api } from "@/store/api";
import type { Attachment } from "./attachment.types";

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