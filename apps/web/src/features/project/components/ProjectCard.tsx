import { FolderKanban, Users } from "lucide-react";

import type { Project } from "../project.types";

import ProjectActions from "./ProjectActions";

import { Link } from "react-router-dom";

interface Props {
  project: Project;

  onEdit: (project: Project) => void;

  onDelete: (project: Project) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
    >
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {project.name}
          </h2>

          <p className="text-sm text-slate-500">
            {project.key}
          </p>
        </div>

        <ProjectActions
          onEdit={() =>
            onEdit(project)
          }
          onDelete={() =>
            onDelete(project)
          }
        />
      </div>

      <p className="mb-6 line-clamp-3 text-sm text-slate-600">
        {project.description ||
          "No description"}
      </p>

      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            project.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {project.status}
        </span>

        <div className="flex items-center gap-2 text-slate-500">
          <Users size={18} />

          {project.members.length}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
        <FolderKanban size={16} />

        {project.visibility}
      </div>
    </Link>
  );
}