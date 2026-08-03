import type {
  DashboardProject,
} from "../dashboard.types";

interface Props {
  projects: DashboardProject[];
}

export default function RecentProjects({
  projects,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Projects
      </h2>

      <div className="space-y-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <h3 className="font-semibold">
                {project.name}
              </h3>

              <p className="text-sm text-slate-500">
                {project.key}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm">
                {project.members} Members
              </p>

              <p className="text-xs text-slate-400">
                {new Date(
                  project.updatedAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="text-center text-slate-400">
            No Projects Found
          </p>
        )}
      </div>
    </div>
  );
}