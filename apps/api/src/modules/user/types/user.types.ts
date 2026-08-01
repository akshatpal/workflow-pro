import { UserRole } from "../model/user.model.js";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  designation: string;
  manager?: string;
  profilePic?: string;
  role: UserRole;
}

export interface UpdateUserInput {
  name?: string;
  designation?: string;
  manager?: string;
  profilePic?: string;
  role?: UserRole;
  isActive?: boolean;
  department?: string;
}

export interface UserQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  sortBy?: string;
  order?: "asc" | "desc";
}