import { HydratedDocument } from "mongoose";
import {
    Project,
    ProjectDocument,
    ProjectStatus,
} from "../model/project.model.js";
import { UserModel } from "../../user/model/user.model.js";

import { ProjectDto } from "../dto/project.dto.js";

import {
    CreateProjectInput,
    UpdateProjectInput,
    ProjectQuery,
} from "../types/project.types.js";

import { NotFoundError } from "../../../common/errors/NotFoundError.js";
import { ConflictError } from "../../../common/errors/ConflictError.js";

export class ProjectService {
    /**
     * Create Project
     */
    static async createProject(
        payload: CreateProjectInput,
        ownerId: string
    ) {
        const existingProject = await Project.findOne({
            key: payload.key.toUpperCase(),
            isDeleted: false,
        });

        if (existingProject) {
            throw new ConflictError(
                "Project key already exists"
            );
        }

        const owner = await UserModel.findById(ownerId);

        if (!owner || !owner.isActive) {
            throw new NotFoundError("Owner not found");
        }

        const members = [
            {
                user: owner._id,
                role: "OWNER",
                joinedAt: new Date(),
            },
        ];

        if (payload.members?.length) {
            for (const member of payload.members) {
                const exists = members.some(
                    (m) => m.user.toString() === member.user
                );

                if (!exists) {
                    members.push({
                        user: member.user as any,
                        role: member.role,
                        joinedAt: new Date(),
                    });
                }
            }
        }

        const project = await Project.create({
            name: payload.name,
            key: payload.key.toUpperCase(),
            description: payload.description,
            avatar: payload.avatar,
            owner: owner._id,
            visibility: payload.visibility,
            members,
        });

        return ProjectDto.toResponse(project as unknown as HydratedDocument<ProjectDocument>);
    }

    /**
     * Get All Projects
     */
    static async getProjects(
        query: ProjectQuery
    ) {
        const {
            page = 1,
            limit = 10,
            search,
            status,
            visibility,
            sortBy = "createdAt",
            order = "desc",
        } = query;

        const filter: any = {
            isDeleted: false,
        };

        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    key: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        if (status) {
            filter.status = status;
        }

        if (visibility) {
            filter.visibility = visibility;
        }

        const skip = (page - 1) * limit;

        const projects = await Project.find(filter)
            .populate(
                "owner",
                "name email profilePic designation"
            )
            .populate(
                "members.user",
                "name email profilePic designation"
            )
            .sort({
                [sortBy]: order === "asc" ? 1 : -1,
            })
            .skip(skip)
            .limit(limit);

        const total =
            await Project.countDocuments(filter);

        return {
            projects:
                ProjectDto.toResponseArray(projects as unknown as HydratedDocument<ProjectDocument>[]),

            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(
                    total / limit
                ),
            },
        };
    }

    /**
     * Get Project By Id
     */
    static async getProjectById(id: string) {
        const project = await Project.findById(id)
            .populate(
                "owner",
                "name email profilePic designation"
            )
            .populate(
                "members.user",
                "name email profilePic designation"
            );

        if (!project || project.isDeleted) {
            throw new NotFoundError(
                "Project not found"
            );
        }

        return ProjectDto.toResponse(project as unknown as HydratedDocument<ProjectDocument>);
    }

    /**
     * Update Project
     */
    static async updateProject(
        id: string,
        payload: UpdateProjectInput
    ) {
        const project = await Project.findById(id);

        if (!project || project.isDeleted) {
            throw new NotFoundError(
                "Project not found"
            );
        }

        if (payload.name !== undefined) {
            project.name = payload.name;
        }

        if (payload.description !== undefined) {
            project.description =
                payload.description;
        }

        if (payload.avatar !== undefined) {
            project.avatar = payload.avatar;
        }

        if (payload.status !== undefined) {
            project.status = payload.status as unknown as typeof project.status;
        }

        if (payload.visibility !== undefined) {
            project.visibility = payload.visibility as unknown as typeof project.visibility;
        }

        if (payload.members !== undefined) {
            project.members = payload.members.map((member) => ({
                user: member.user as any,
                role: member.role as unknown as typeof project.members[0]["role"],
                joinedAt: new Date(),
            })) as unknown as typeof project.members;
        }

        await project.save();

        const updatedProject = await Project.findById(project._id)
            .populate(
                "owner",
                "name email profilePic designation"
            )
            .populate(
                "members.user",
                "name email profilePic designation"
            );

        return ProjectDto.toResponse(updatedProject as unknown as HydratedDocument<ProjectDocument>);
    }

    /**
     * Archive Project
     */
    static async archiveProject(id: string) {
        const project = await Project.findById(id);

        if (!project || project.isDeleted) {
            throw new NotFoundError("Project not found");
        }

        project.status = ProjectStatus.ARCHIVED as unknown as typeof project.status;

        await project.save();

        return ProjectDto.toResponse(project as unknown as HydratedDocument<ProjectDocument>);
    }

    /**
     * Restore Project
     */
    static async restoreProject(id: string) {
        const project = await Project.findById(id);

        if (!project || project.isDeleted) {
            throw new NotFoundError("Project not found");
        }

        project.status = ProjectStatus.ACTIVE as unknown as typeof project.status;

        await project.save();

        return ProjectDto.toResponse(project as unknown as HydratedDocument<ProjectDocument>);
    }

    /**
     * Add Member
     */
    static async addMember(
        projectId: string,
        userId: string,
        role: string = "MEMBER"
    ) {
        const project = await Project.findById(projectId);

        if (!project || project.isDeleted) {
            throw new NotFoundError("Project not found");
        }

        const user = await UserModel.findById(userId);

        if (!user || !user.isActive) {
            throw new NotFoundError("User not found");
        }

        const exists = project.members.some(
            (member) =>
                member.user.toString() === userId
        );

        if (exists) {
            throw new ConflictError(
                "User is already a member of this project"
            );
        }

        project.members.push({
            user: user._id,
            role: role as any,
            joinedAt: new Date(),
        });

        await project.save();

        return ProjectDto.toResponse(project as unknown as HydratedDocument<ProjectDocument>);
    }

    /**
     * Remove Member
     */
    static async removeMember(
        projectId: string,
        userId: string
    ) {
        const project = await Project.findById(projectId);

        if (!project || project.isDeleted) {
            throw new NotFoundError("Project not found");
        }

        project.members = project.members.filter(
            (member) =>
                member.user.toString() !== userId
        ) as typeof project.members;

        await project.save();

        return ProjectDto.toResponse(project as unknown as HydratedDocument<ProjectDocument>);
    }

    /**
     * Change Member Role
     */
    static async changeMemberRole(
        projectId: string,
        userId: string,
        role: string
    ) {
        const project = await Project.findById(projectId);

        if (!project || project.isDeleted) {
            throw new NotFoundError("Project not found");
        }

        const member = project.members.find(
            (m) =>
                m.user.toString() === userId
        );

        if (!member) {
            throw new NotFoundError(
                "Project member not found"
            );
        }

        member.role = role as any;

        await project.save();

        return ProjectDto.toResponse(project as unknown as HydratedDocument<ProjectDocument>);
    }

    /**
     * Delete Project (Soft Delete)
     */
    static async deleteProject(id: string) {
        const project = await Project.findById(id);

        if (!project || project.isDeleted) {
            throw new NotFoundError("Project not found");
        }

        project.isDeleted = true;

        await project.save();

        return {
            message: "Project deleted successfully",
        };
    }
}