import {
  useParams,
} from "react-router-dom";

import Breadcrumb from "@/components/common/Breadcrumb";
import ErrorState from "@/components/common/ErrorState";

import {
  useGetProjectByIdQuery,
} from "@/features/project/projectApi";

import ProjectHeader from "@/features/project/components/ProjectHeader";
import ProjectOverview from "@/features/project/components/ProjectOverview";
import ProjectStats from "@/features/project/components/ProjectStats";
import ProjectMembers from "@/features/project/components/ProjectMembers";

export default function ProjectDetailsPage() {
  const { id } =
    useParams();

  const {
    data,
    isLoading,
    isError,
  } =
    useGetProjectByIdQuery(
      id!
    );

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-40 rounded-xl bg-slate-200" />

        <div className="grid grid-cols-2 gap-6">
          <div className="h-40 rounded-xl bg-slate-200" />

          <div className="h-40 rounded-xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <ErrorState message="Unable to load project." />
    );
  }

  const project = data;

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          {
            label:
              "Projects",
            href: "/projects",
          },

          {
            label:
              project.name,
          },
        ]}
      />

      <ProjectHeader
        project={project}
      />

      <ProjectStats
        project={project}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ProjectOverview
          project={project}
        />

        <ProjectMembers
          project={project}
        />
      </div>
    </div>
  );
}