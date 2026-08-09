export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE";

export interface Assignee {
  id: string;

  name: string;

  email: string;

  avatar?: string;
}

export interface Label {
  id: string;

  name: string;

  color: string;
}

export interface CreateTaskRequest {
  title: string;

  description?: string;

  priority: TaskPriority;

  column: string;

  assignee?: string;

  dueDate?: string;

  labels?: string[];
}

export interface Task {
  id: string;

  title: string;

  description?: string;

  priority: TaskPriority;

  status: TaskStatus;

  position: number;

  board: string;

  column: string;

  assignee?: Assignee;

  labels: Label[];

  dueDate?: string;

  createdAt: string;

  updatedAt: string;
}

export interface UpdateTaskRequest {
  title?: string;

  description?: string;

  priority?: TaskPriority;

  assignee?: string;

  dueDate?: string;

  labels?: string[];
}

export interface TaskResponse {
  success: boolean;

  message: string;

  data: Task;
}