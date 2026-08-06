import type { Project } from "../project.types";

import ProjectCard from "./ProjectCard";

interface Props {
  projects: Project[];

  onEdit: (project: Project) => void;

  onDelete: (project: Project) => void;
}

export default function ProjectGrid({
  projects,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}