import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    credentials: "include",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.accessToken;

      if (token) {
        headers.set(
          "Authorization",
          `Bearer ${token}`
        );
      }

      return headers;
    },
  }),

  tagTypes: [
    "Auth",
    "Project",
    "Board",
    "Task",
    "Comment",
    "Notification",
  ],

  endpoints: () => ({}),
});