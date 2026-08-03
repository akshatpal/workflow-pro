export class DashboardDto {
  static statistics(data: any) {
    return {
      totalProjects: data.totalProjects,

      activeProjects: data.activeProjects,

      archivedProjects: data.archivedProjects,

      totalTasks: data.totalTasks,

      completedTasks: data.completedTasks,

      inProgressTasks: data.inProgressTasks,

      todoTasks: data.todoTasks,
    };
  }

  static dashboard(data: any) {
    return {
      statistics: this.statistics(
        data.statistics
      ),

      recentProjects:
        data.recentProjects,

      myTasks: data.myTasks,

      recentActivities:
        data.recentActivities,
    };
  }
}