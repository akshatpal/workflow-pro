import { HydratedDocument } from "mongoose";
import { ProjectDocument } from "../model/project.model.js";

export class ProjectDto {
  static toResponse(project: HydratedDocument<ProjectDocument>) {
    return {
      id: project._id.toString(),

      name: project.name,

      key: project.key,

      description: project.description,

      avatar: project.avatar,

      status: project.status,

      visibility: project.visibility,

      owner: project.owner,

      members: project.members.map((member) => ({
        user: member.user,
        role: member.role,
        joinedAt: member.joinedAt,
      })),

      settings: {
        allowGuestAccess:
          project.settings?.allowGuestAccess ?? false,

        allowMemberInvite:
          project.settings?.allowMemberInvite ?? false,

        taskPrefix:
          project.settings?.taskPrefix ?? "",
      },

      createdAt: project.createdAt,

      updatedAt: project.updatedAt,
    };
  }

  static toResponseArray(
    projects: HydratedDocument<ProjectDocument>[]
  ) {
    return projects.map((project) =>
      this.toResponse(project)
    );
  }
}