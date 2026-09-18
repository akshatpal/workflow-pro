import { useState } from "react";
import { Plus } from "lucide-react";

import DashboardCard from "@/features/dashboard/components/DahsboardCard";
import RecentProjects from "@/features/dashboard/components/RecentProjects";
import MyTasks from "@/features/dashboard/components/MyTasks";
import ActivityTimeline from "@/features/dashboard/components/ActivityTimeline";
import DashboardSkeleton from "@/features/dashboard/components/DashboardSkeleton";
import CreateTaskDashboardModal from "@/features/task/components/CreateTaskDashboardModal";

import {
  useGetDashboardQuery,
} from "@/features/dashboard/dashboardApi";

export default function DashboardPage() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back 👋
          </p>
        </div>

        <button
          onClick={() => setIsCreateTaskOpen(true)}
          className="flex items-center gap-2 self-start rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm hover:bg-blue-700 transition sm:self-auto"
        >
          <Plus size={18} />
          Create Task
        </button>
      </div>

      <CreateTaskDashboardModal
        open={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
      />

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