import { api } from "@/store/api";

import type {
  DashboardResponse,
} from "./dashboard.types";

export const dashboardApi =
  api.injectEndpoints({
    endpoints: (builder) => ({
      getDashboard:
        builder.query<
          DashboardResponse,
          void
        >({
          query: () => ({
            url: "/dashboard",
          }),

          providesTags: [
            "Project",
            "Task",
          ],
        }),
    }),
  });

export const {
  useGetDashboardQuery,
} = dashboardApi;