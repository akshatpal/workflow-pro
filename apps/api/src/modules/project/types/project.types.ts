import {
  ProjectMemberRole,
  ProjectStatus,
  ProjectVisibility,
} from "../model/project.model.js";

export interface ProjectMemberInput {
  user: string;
  role: ProjectMemberRole;
}

export interface CreateProjectInput {
  name: string;
  key: string;
  description?: string;
  avatar?: string;

  owner: string;

  visibility?: ProjectVisibility;

  members?: ProjectMemberInput[];
}

export interface UpdateProjectInput {
  name?: string;

  description?: string;

  avatar?: string;

  status?: ProjectStatus;

  visibility?: ProjectVisibility;

  members?: ProjectMemberInput[];
}

export interface ProjectQuery {
  page?: number;

  limit?: number;

  search?: string;

  status?: ProjectStatus;

  visibility?: ProjectVisibility;

  sortBy?: string;

  order?: "asc" | "desc";
}