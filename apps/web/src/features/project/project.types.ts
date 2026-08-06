export interface ProjectMember {
    user: string;

    role: string;
}

export interface Project {
    id: string;

    name: string;

    key: string;

    description: string;

    avatar: string;

    status: string;

    visibility: string;

    owner: string;

    members: ProjectMember[];

    createdAt: string;

    updatedAt: string;
}

export interface ProjectListResponse {
    success: boolean;

    message: string;

    data: {
        projects: Project[];

        pagination: {
            page: number;

            limit: number;

            total: number;

            totalPages: number;
        };
    };
}

export interface CreateProjectRequest {
    name: string;

    key: string;

    description?: string;

    visibility: string;
}

export interface UpdateProjectRequest {
    name?: string;

    description?: string;

    visibility?: string;

    status?: string;
}