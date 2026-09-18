import { Link } from "react-router-dom";

import type {
  DashboardTask,
} from "../dashboard.types";

interface Props {
  tasks: DashboardTask[];
}

export default function MyTasks({
  tasks,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-semibold">
        My Tasks
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Link
            key={task.id}
            to={`/tasks/${task.id}`}
            className="block rounded-lg border p-4 transition-all hover:border-blue-400 hover:shadow-sm"
          >
            <h3 className="font-semibold text-slate-800 hover:text-blue-600">
              {task.title}
            </h3>

            <div className="mt-2 flex justify-between text-sm text-slate-500">
              <span>
                {task.project?.key}
              </span>

              <span className="capitalize">
                {task.status?.toLowerCase().replace(/_/g, " ")}
              </span>
            </div>
          </Link>
        ))}

        {tasks.length === 0 && (
          <p className="text-center text-slate-400">
            No Tasks Assigned
          </p>
        )}
      </div>
    </div>
  );
}