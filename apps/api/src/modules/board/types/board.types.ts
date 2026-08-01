import { BoardType } from "../model/board.model.js";

export interface CreateBoardInput {
  name: string;
  description?: string;
  type?: BoardType;
  project: string;
  createdBy: string;
}

export interface UpdateBoardInput {
  name?: string;
  description?: string;
  type?: BoardType;
  isDefault?: boolean;
}

export interface BoardQuery {
  page?: number;
  limit?: number;
  search?: string;
}