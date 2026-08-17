import { api } from "@/store/api";

import type {
    NotificationResponse,
    UnreadCountResponse,
    CreateNotificationRequest,
} from "./notification.types";

export const notificationApi =
    api.injectEndpoints({
        endpoints: (builder) => ({
            // GET /notifications/user/:userId?page=&limit=
            getNotifications: builder.query<
                NotificationResponse,
                {
                    userId: string;
                    page?: number;
                    limit?: number;
                }
            >({
                query: ({
                    userId,
                    page = 1,
                    limit = 10,
                }) => ({
                    url: `/notifications/user/${userId}`,
                    params: {
                        page,
                        limit,
                    },
                }),

                transformResponse: (
                    response: { data: NotificationResponse }
                ) => response.data,

                providesTags: ["Notification"],
            }),

            // GET /notifications/user/:userId/unread-count
            getUnreadCount: builder.query<
                UnreadCountResponse,
                string
            >({
                query: (userId) =>
                    `/notifications/user/${userId}/unread-count`,

                transformResponse: (
                    response: { data: UnreadCountResponse }
                ) => response.data,

                providesTags: ["Notification"],
            }),

            // PATCH /notifications/:id/read
            markAsRead:
                builder.mutation<
                    void,
                    string
                >({
                    query: (id) => ({
                        url: `/notifications/${id}/read`,

                        method: "PATCH",
                    }),

                    invalidatesTags: [
                        "Notification",
                    ],
                }),

            // PATCH /notifications/user/:userId/read-all
            markAllRead:
                builder.mutation<
                    void,
                    string
                >({
                    query: (userId) => ({
                        url: `/notifications/user/${userId}/read-all`,

                        method: "PATCH",
                    }),

                    invalidatesTags: [
                        "Notification",
                    ],
                }),

            // DELETE /notifications/:id
            deleteNotification:
                builder.mutation<
                    void,
                    string
                >({
                    query: (id) => ({
                        url: `/notifications/${id}`,

                        method: "DELETE",
                    }),

                    invalidatesTags: [
                        "Notification",
                    ],
                }),
            // POST /notifications
            createNotification:
                builder.mutation<
                    void,
                    CreateNotificationRequest
                >({
                    query: (body) => ({
                        url: "/notifications",
                        method: "POST",
                        body,
                    }),

                    invalidatesTags: [
                        "Notification",
                    ],
                }),
        }),
    });

export const {
    useGetNotificationsQuery,
    useGetUnreadCountQuery,
    useCreateNotificationMutation,
    useMarkAsReadMutation,
    useMarkAllReadMutation,
    useDeleteNotificationMutation,
} = notificationApi;