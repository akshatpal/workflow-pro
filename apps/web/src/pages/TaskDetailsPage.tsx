import { useParams } from "react-router-dom";

import { useGetTaskByIdQuery } from "@/features/task/taskApi";

import TaskDetailsDrawer from "@/features/task/components/TaskDetailsDrawer";

export default function TaskDetailsPage() {
  const { id } = useParams();

  const {
    data,
    isLoading,
    isError,
  } = useGetTaskByIdQuery(id!);

  if (isLoading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8">
        Task not found.
      </div>
    );
  }

  return (
    <TaskDetailsDrawer
      task={data.data}
    />
  );
}