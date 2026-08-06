import { api } from "@/store/api";

import type {
    Board,
    BoardResponse,
    CreateBoardRequest,
    UpdateBoardRequest,
} from "./board.types";

export const boardApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBoards: builder.query<
            {
                success: boolean;

                message: string;

                data: {
                    boards: Board[];

                    pagination: {
                        page: number;

                        totalPages: number;

                        total: number;
                    };
                };
            },
            string
        >({
            query: (projectId) => ({
                url: `/boards/project/${projectId}`,
            }),

            providesTags: ["Board"],
        }),

        createBoard: builder.mutation<
            Board,
            CreateBoardRequest
        >({
            query: (body) => ({
                url: "/boards",

                method: "POST",

                body,
            }),

            invalidatesTags: ["Board"],
        }),

        updateBoard: builder.mutation<
            Board,
            {
                id: string;
                body: UpdateBoardRequest;
            }
        >({
            query: ({ id, body }) => ({
                url: `/boards/${id}`,

                method: "PATCH",

                body,
            }),

            invalidatesTags: ["Board"],
        }),

        deleteBoard: builder.mutation<
            void,
            string
        >({
            query: (id) => ({
                url: `/boards/${id}`,

                method: "DELETE",
            }),

            invalidatesTags: ["Board"],
        }),

        getBoardById: builder.query<
            BoardResponse,
            string
        >({
            query: (id) => ({
                url: `/boards/${id}`,
            }),

            providesTags: ["Board"],
        }),
        reorderColumns: builder.mutation<
            void,
            {
                boardId: string;

                columns: {
                    id: string;

                    position: number;
                }[];
            }
        >({
            query: (body) => ({
                url: "/columns/reorder",

                method: "PATCH",

                body,
            }),

            invalidatesTags: ["Board"],
        }),
        reorderTasks: builder.mutation<
            void,
            {
                columns: {
                    columnId: string;

                    tasks: {
                        id: string;

                        position: number;
                    }[];
                }[];
            }
        >({
            query: (body) => ({
                url: "/tasks/reorder",

                method: "PATCH",

                body,
            }),

            invalidatesTags: ["Board"],
        }),
    }),
});

export const {
    useGetBoardsQuery,
    useCreateBoardMutation,
    useUpdateBoardMutation,
    useDeleteBoardMutation,
    useGetBoardByIdQuery,
    useReorderColumnsMutation,
    useReorderTasksMutation
} = boardApi;