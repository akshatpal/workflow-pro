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
  owner: {
    name: string;
    profilePic: string;
  };
  members: number;
  updatedAt: string;
}

export interface DashboardTask {
  id: string;
  title: string;
  priority: string;
  status: string;
  dueDate: string;
  project: {
    name: string;
    key: string;
  };
}

export interface DashboardActivity {
  id: string;
  action: string;
  title: string;
  project: {
    name: string;
  };
  time: string;
}

export interface DashboardResponse {
  success: boolean;

  message: string;

  data: {
    statistics: DashboardStatistics;
    recentProjects: DashboardProject[];
    myTasks: DashboardTask[];
    recentActivities: DashboardActivity[];
  };
}