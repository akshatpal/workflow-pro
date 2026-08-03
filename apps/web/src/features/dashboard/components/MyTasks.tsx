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
          <div
            key={task.id}
            className="rounded-lg border p-4"
          >
            <h3 className="font-semibold">
              {task.title}
            </h3>

            <div className="mt-2 flex justify-between text-sm text-slate-500">
              <span>
                {task.project?.key}
              </span>

              <span>
                {task.status}
              </span>
            </div>
          </div>
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