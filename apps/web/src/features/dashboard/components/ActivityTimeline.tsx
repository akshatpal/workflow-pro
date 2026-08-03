import type {
  DashboardActivity,
} from "../dashboard.types";

interface Props {
  activities: DashboardActivity[];
}

export default function ActivityTimeline({
  activities,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="border-l-2 border-blue-500 pl-4"
          >
            <p className="font-medium">
              {activity.action}
            </p>

            <p className="text-sm text-slate-600">
              {activity.title}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {new Date(
                activity.time
              ).toLocaleString()}
            </p>
          </div>
        ))}

        {activities.length === 0 && (
          <p className="text-center text-slate-400">
            No Activity Found
          </p>
        )}
      </div>
    </div>
  );
}