import { api } from "@/store/api";

import type {
  Assignee,
  CreateTaskRequest,
  Task,
  TaskResponse,
  UpdateTaskRequest,
} from "./task.types";

export const taskApi =
  api.injectEndpoints({
    endpoints: (builder) => ({
      createTask:
        builder.mutation<
          Task,
          CreateTaskRequest
        >({
          query: (body) => ({
            url: "/tasks",

            method: "POST",

            body,
          }),

          invalidatesTags: [
            "Board",
            "Task",
          ],
        }),

      getTaskById:
        builder.query<
          TaskResponse,
          string
        >({
          query: (id) => ({
            url: `/tasks/${id}`,
          }),

          providesTags: [
            "Task",
          ],
        }),

      updateTask:
        builder.mutation<
          Task,
          {
            id: string;

            body: UpdateTaskRequest;
          }
        >({
          query: ({
            id,
            body,
          }) => ({
            url: `/tasks/${id}`,

            method: "PATCH",

            body,
          }),

          invalidatesTags: [
            "Task",
            "Board",
          ],
        }),

      deleteTask:
        builder.mutation<
          void,
          string
        >({
          query: (id) => ({
            url: `/tasks/${id}`,

            method: "DELETE",
          }),

          invalidatesTags: [
            "Task",
            "Board",
          ],
        }),

      getUsers: builder.query<
        Assignee[],
        void
      >({
        query: () => ({
          url: "/users",
        }),

        transformResponse: (
          response: {
            data: {
              users: Assignee[];
            };
          }
        ) => response.data.users,

        providesTags: ["User"],
      }),
    }),
  });

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useGetUsersQuery,
} = taskApi;