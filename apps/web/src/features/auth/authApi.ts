import { api } from "@/store/api";

import type {
  LoginRequest,
  LoginResponse,
  CurrentUserResponse,
} from "./auth.types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponse,
      LoginRequest
    >({
      query: (body) => ({
        url: "/auth/login",

        method: "POST",

        body,
      }),
    }),

    getCurrentUser: builder.query<
      CurrentUserResponse,
      void
    >({
      query: () => ({
        url: "/auth/current-user",
      }),

      providesTags: ["Auth"],
    }),

    refresh: builder.mutation<
      LoginResponse,
      void
    >({
      query: () => ({
        url: "/auth/refresh",

        method: "POST",
      }),
    }),

    logout: builder.mutation<
      any,
      void
    >({
      query: () => ({
        url: "/auth/logout",

        method: "POST",
      }),

      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useRefreshMutation,
  useLogoutMutation,
} = authApi;

export const useMeQuery = useGetCurrentUserQuery;