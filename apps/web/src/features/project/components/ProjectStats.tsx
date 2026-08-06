import { FolderKanban, Users } from "lucide-react";

import type { Project } from "../project.types";

interface Props {
  project: Project;
}

export default function ProjectStats({
  project,
}: Props) {
  // Unwrap API envelope { success, message, data: {...} } if present
  const p: Project = (project as any)?.data ?? project;

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="rounded-xl bg-white p-6 shadow">
        <FolderKanban
          size={32}
          className="text-blue-600"
        />

        <h2 className="mt-4 text-3xl font-bold">
          {p.key}
        </h2>

        <p className="text-slate-500">
          Project Key
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <Users
          size={32}
          className="text-green-600"
        />

        <h2 className="mt-4 text-3xl font-bold">
          {p.members?.length ?? 0}
        </h2>

        <p className="text-slate-500">
          Members
        </p>
      </div>
    </div>
  );
}