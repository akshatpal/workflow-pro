export interface DashboardStatistics {
  totalProjects: number;

  activeProjects: number;

  archivedProjects: number;

  totalTasks: number;

  todoTasks: number;

  inProgressTasks: number;

  completedTasks: number;
}

export interface DashboardProject {
  id: string;

  name: string;

  key: string;

  avatar: string;

  owner: unknown;

  members: number;

  updatedAt: Date;
}

export interface DashboardTask {
  id: string;

  title: string;

  priority: string;

  status: string;

  dueDate: Date;

  project: unknown;
}

export interface DashboardActivity {
  id: string;

  action: string;

  title: string;

  project: unknown;

  time: Date;
}