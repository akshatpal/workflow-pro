import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";



const baseQuery =
  fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_API_URL,

    credentials: "include",

    prepareHeaders: (
      headers,
      { getState }
    ) => {
      const token = (
        getState() as any
      ).auth.accessToken as string | null;

      if (token) {
        headers.set(
          "Authorization",
          `Bearer ${token}`
        );
      }

      return headers;
    },
  });

const baseQueryWithRefresh =
  async (
    args: any,
    api: any,
    extraOptions: any
  ) => {
    let result =
      await baseQuery(
        args,
        api,
        extraOptions
      );

    if (
      result.error &&
      result.error.status === 401
    ) {
      const refreshResult =
        await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
          },
          api,
          extraOptions
        );

      if (refreshResult.data) {
        api.dispatch({
          type:
            "auth/setCredentials",
          payload:
            (refreshResult.data as { data: unknown }).data,
        });

        result =
          await baseQuery(
            args,
            api,
            extraOptions
          );
      } else {
        api.dispatch({
          type: "auth/logout",
        });
      }
    }

    return result;
  };

export const api =
  createApi({
    reducerPath: "api",

    baseQuery:
      baseQueryWithRefresh,

    tagTypes: [
      "Auth",
      "Dashboard",
      "Project",
      "Board",
      "Task",
      "Comment",
      "Notification",
      "User",
      "Label",
      "Comment",
      "Attachment",
    ],

    endpoints: () => ({}),
  });