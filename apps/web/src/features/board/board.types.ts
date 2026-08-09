import type { Task } from "@/features/task/task.types";

export interface BoardListResponse {
  success: boolean;

  message: string;

  data: Board[];
}

export interface CreateBoardRequest {
  name: string;

  description?: string;

  project: string;
}

export interface UpdateBoardRequest {
  name?: string;

  description?: string;
}

export interface Column {
  id: string;

  name: string;

  position: number;

  tasks?: Task[];
}

export interface Board {
  id: string;

  name: string;

  description: string;

  type: string;

  project: string;

  columns: Column[];
}

export interface BoardResponse {
  success: boolean;

  message: string;

  data: Board;
}