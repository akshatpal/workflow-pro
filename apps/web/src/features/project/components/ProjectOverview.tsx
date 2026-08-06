import type { Project } from "../project.types";

interface Props {
  project: Project;
}

export default function ProjectOverview({
  project,
}: Props) {
  // Unwrap API envelope { success, message, data: {...} } if present
  const p: Project = (project as any)?.data ?? project;

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Overview
      </h2>

      <div className="space-y-3">
        <p>
          <strong>Status:</strong>{" "}
          {p.status}
        </p>

        <p>
          <strong>Visibility:</strong>{" "}
          {p.visibility}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {p.createdAt
            ? new Date(p.createdAt).toLocaleDateString()
            : "—"}
        </p>

        <p>
          <strong>Updated:</strong>{" "}
          {p.updatedAt
            ? new Date(p.updatedAt).toLocaleDateString()
            : "—"}
        </p>
      </div>
    </div>
  );
}