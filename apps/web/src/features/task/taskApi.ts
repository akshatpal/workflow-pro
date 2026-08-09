import { api } from "@/store/api";

import type {
  Assignee,
  CreateTaskRequest,
  Label,
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

        providesTags: ["User"],
      }),

      getLabels: builder.query<
        Label[],
        void
      >({
        query: () => ({
          url: "/labels",
        }),

        providesTags: ["Label"],
      }),
    }),
  });

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useGetUsersQuery,
  useGetLabelsQuery,
} = taskApi;