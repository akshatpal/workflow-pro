import {
  TaskPriority,
  TaskStatus,
} from "../model/task.model.js";

export interface CreateTaskInput {
  title: string;
  description?: string;

  project: string;
  board: string;
  column: string;

  assignee?: string;
  reporter: string;

  priority?: TaskPriority;
  status?: TaskStatus;

  storyPoints?: number;

  dueDate?: Date;

  labels?: string[];
}

export interface UpdateTaskInput {
  title?: string;

  description?: string;

  assignee?: string;

  priority?: TaskPriority;

  status?: TaskStatus;

  storyPoints?: number;

  dueDate?: Date;

  labels?: string[];

  column?: string;

  position?: number;
}

export interface TaskQuery {
  project?: string;

  board?: string;

  assignee?: string;

  priority?: TaskPriority;

  status?: TaskStatus;

  search?: string;

  page?: number;

  limit?: number;
}