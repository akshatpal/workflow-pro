import { api } from "@/store/api";

import type {
  Conversation,
  CreateConversationRequest,
  Message,
  SendMessageRequest,
  UpdateMessageRequest,
} from "./chat.types";

export const chatApi =
  api.injectEndpoints({
    endpoints: (builder) => ({
      getConversations:
        builder.query<
          Conversation[],
          string | void
        >({
          query: (userId) => ({
            url: userId ? `/chat/conversations/${userId}` : "/chat/conversations",
          }),

          transformResponse: (
            response: any
          ) => {
            if (Array.isArray(response)) return response;
            if (Array.isArray(response?.data)) return response.data;
            return [];
          },

          providesTags: [
            "Chat",
          ],
        }),

      createConversation:
        builder.mutation<
          Conversation,
          CreateConversationRequest
        >({
          query: (body) => ({
            url: "/chat/conversations",
            method: "POST",
            body,
          }),

          transformResponse: (
            response: any
          ) => response?.data ?? response,

          invalidatesTags: [
            "Chat",
          ],
        }),

      getMessages:
        builder.query<
          Message[],
          string
        >({
          query: (
            conversationId
          ) => ({
            url: `/chat/messages/${conversationId}`,
          }),

          transformResponse: (
            response: any
          ) => {
            if (Array.isArray(response)) return response;
            if (Array.isArray(response?.data)) return response.data;
            return [];
          },

          providesTags: [
            "Chat",
          ],
        }),

      sendMessage:
        builder.mutation<
          Message,
          SendMessageRequest
        >({
          query: (body) => ({
            url: "/chat/messages",
            method: "POST",
            body,
          }),

          transformResponse: (
            response: any
          ) => response?.data ?? response,

          invalidatesTags: [
            "Chat",
          ],
        }),

      updateMessage:
        builder.mutation<
          Message,
          {
            id: string;
            body: UpdateMessageRequest;
          }
        >({
          query: ({
            id,
            body,
          }) => ({
            url: `/chat/messages/${id}`,
            method: "PATCH",
            body,
          }),

          transformResponse: (
            response: any
          ) => response?.data ?? response,

          invalidatesTags: [
            "Chat",
          ],
        }),

      deleteMessage:
        builder.mutation<
          void,
          string
        >({
          query: (id) => ({
            url: `/chat/messages/${id}`,
            method: "DELETE",
          }),

          invalidatesTags: [
            "Chat",
          ],
        }),

      addReaction:
        builder.mutation<
          Message,
          {
            id: string;
            userId: string;
            emoji: string;
          }
        >({
          query: ({
            id,
            userId,
            emoji,
          }) => ({
            url: `/chat/messages/${id}/reaction`,
            method: "PATCH",
            body: {
              userId,
              emoji,
            },
          }),

          transformResponse: (
            response: any
          ) => response?.data ?? response,

          invalidatesTags: [
            "Chat",
          ],
        }),

      removeReaction:
        builder.mutation<
          Message,
          {
            id: string;
            userId: string;
            emoji: string;
          }
        >({
          query: ({
            id,
            userId,
            emoji,
          }) => ({
            url: `/chat/messages/${id}/reaction`,
            method: "DELETE",
            body: {
              userId,
              emoji,
            },
          }),

          transformResponse: (
            response: any
          ) => response?.data ?? response,

          invalidatesTags: [
            "Chat",
          ],
        }),
    }),
  });

export const {
  useGetConversationsQuery,
  useCreateConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useAddReactionMutation,
  useRemoveReactionMutation,
} = chatApi;