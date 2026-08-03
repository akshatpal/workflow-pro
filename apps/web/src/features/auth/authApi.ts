import { api } from "../../store/api";

import type {
  LoginRequest,
  LoginResponse,
  MeResponse,
} from "./auth.types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",

        method: "POST",

        body,
      }),
    }),

    me: builder.query<
      MeResponse,
      void
    >({
      query: () => ({
        url: "/auth/me",
      }),

      providesTags: ["Auth"],
    }),

    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",

        method: "POST",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",

        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,

  useMeQuery,

  useRefreshMutation,

  useLogoutMutation,
} = authApi;