import UpdateProjectModal from "@/features/project/components/UpdateProjectModal";
import DeleteProjectDialog from "@/features/project/components/DeleteProjectDialog";

import { useState } from "react";

import {
  useGetProjectsQuery,
} from "@/features/project/projectApi";

import ProjectGrid from "@/features/project/components/ProjectGrid";
import ProjectEmpty from "@/features/project/components/ProjectEmpty";
import ProjectSkeleton from "@/features/project/components/ProjectSkeleton";
import CreateProjectModal from "@/features/project/components/CreateProjectModal";
import ProjectFilters from "@/features/project/components/ProjectFilters";
import Pagination from "@/features/project/components/Pagination";

import useDebounce from "@/hooks/useDebounce";
import type { Project } from "@/features/project/project.types";
import PageHeader from "@/components/common/PageHeader";

export default function ProjectsPage() {
    const [createOpen, setCreateOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

  const [page, setPage] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [
    visibility,
    setVisibility,
  ] = useState("");

  const debouncedSearch =
    useDebounce(search);

  const {
    data,
    isLoading,
  } = useGetProjectsQuery({
    page,
    limit: 9,
    search:
      debouncedSearch || undefined,
    status:
      status || undefined,
    visibility:
      visibility || undefined,
  });

  if (isLoading) {
    return <ProjectSkeleton />;
  }

  const projects =
    data?.data.projects ?? [];

  const handleEdit = (project: Project) => {
      setSelectedProject(project);
      setEditOpen(true);
  };

  const handleDelete = (project: Project) => {
    setSelectedProject(project);
    setDeleteOpen(true);
  };

  const pagination =
    data?.data.pagination;

  return (
    <>
      <CreateProjectModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      <UpdateProjectModal
                open={editOpen}
                project={selectedProject}
                onClose={() => {
                    setEditOpen(false);
                    setSelectedProject(null);
                }}
            />

            {selectedProject && (
                <DeleteProjectDialog
                    open={deleteOpen}
                    projectId={selectedProject.id}
                    projectName={selectedProject.name}
                    onClose={() => {
                        setDeleteOpen(false);
                        setSelectedProject(null);
                    }}
                />
            )}

      <div className="space-y-8">
        <PageHeader
            title="Projects"
            subtitle="Manage all your projects"
            action={
                <button
                onClick={() =>
                    setCreateOpen(true)
                }
                className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                >
                Create Project
                </button>
            }
        />

        <ProjectFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          visibility={
            visibility
          }
          setVisibility={
            setVisibility
          }
        />

        {projects.length === 0 ? (
          <ProjectEmpty />
        ) : (
          <>
            <ProjectGrid
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <Pagination
              page={
                pagination?.page ??
                1
              }
              totalPages={
                pagination?.totalPages ??
                1
              }
              onChange={setPage}
            />
          </>
        )}
      </div>
    </>
  );
}