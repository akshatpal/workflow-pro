import { api } from "@/store/api";
import type {
    CreateProjectRequest,
    Project,
    ProjectListResponse,
    UpdateProjectRequest,
} from "./project.types";

export const projectApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<
            ProjectListResponse,
            {
                page?: number;
                limit?: number;
                search?: string;
                status?: string;
                visibility?: string;
            }
        >({
            query: (params) => ({
                url: "/projects",
                params,
            }),

            providesTags: ["Project"],
        }),

        getProjectById: builder.query<
            Project,
            string
        >({
            query: (id) => ({
                url: `/projects/${id}`,
            }),

            providesTags: ["Project"],
        }),

        createProject: builder.mutation<Project, CreateProjectRequest>({
            query: (body) => ({
                url: "/projects",
                method: "POST",
                body,
            }),

            invalidatesTags: ["Project"],
        }),

        updateProject: builder.mutation<
            Project,
            { id: string; body: UpdateProjectRequest }
        >({
            query: ({ id, body }) => ({
                url: `/projects/${id}`,
                method: "PATCH",
                body,
            }),

            invalidatesTags: ["Project"],
        }),

        deleteProject: builder.mutation<void, string>({
            query: (id) => ({
                url: `/projects/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Project"],
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useGetProjectByIdQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectApi;