import DashboardCard from "@/features/dashboard/components/DahsboardCard";
import RecentProjects from "@/features/dashboard/components/RecentProjects";
import MyTasks from "@/features/dashboard/components/MyTasks";
import ActivityTimeline from "@/features/dashboard/components/ActivityTimeline";
import DashboardSkeleton from "@/features/dashboard/components/DashboardSkeleton";

import {
  useGetDashboardQuery,
} from "@/features/dashboard/dashboardApi";

export default function DashboardPage() {
  const {
    data,
    isLoading,
  } = useGetDashboardQuery();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const dashboard = data?.data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back 👋
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <DashboardCard
          title="Projects"
          value={
            dashboard?.statistics
              .totalProjects ?? 0
          }
          color="text-blue-600"
        />

        <DashboardCard
          title="Tasks"
          value={
            dashboard?.statistics
              .totalTasks ?? 0
          }
          color="text-purple-600"
        />

        <DashboardCard
          title="Completed"
          value={
            dashboard?.statistics
              .completedTasks ?? 0
          }
          color="text-green-600"
        />

        <DashboardCard
          title="Todo"
          value={
            dashboard?.statistics
              .todoTasks ?? 0
          }
          color="text-red-600"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <RecentProjects
          projects={
            dashboard
              ?.recentProjects ??
            []
          }
        />

        <MyTasks
          tasks={
            dashboard?.myTasks ??
            []
          }
        />

        <ActivityTimeline
          activities={
            dashboard
              ?.recentActivities ??
            []
          }
        />
      </div>
    </div>
  );
}