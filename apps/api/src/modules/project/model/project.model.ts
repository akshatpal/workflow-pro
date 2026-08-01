import { Schema, model, InferSchemaType } from "mongoose";

export enum ProjectStatus {
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED",
}

export enum ProjectVisibility {
    PRIVATE = "PRIVATE",
    PUBLIC = "PUBLIC",
}

export enum ProjectMemberRole {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
}

const memberSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        role: {
            type: String,
            enum: Object.values(ProjectMemberRole),
            default: ProjectMemberRole.MEMBER,
        },

        joinedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        _id: false,
    }
);

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        key: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
            unique: true,
        },

        description: {
            type: String,
            default: "",
        },

        avatar: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: Object.values(ProjectStatus),
            default: ProjectStatus.ACTIVE,
        },

        visibility: {
            type: String,
            enum: Object.values(ProjectVisibility),
            default: ProjectVisibility.PRIVATE,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        members: {
            type: [memberSchema],
            default: [],
        },

        settings: {
            allowGuestAccess: {
                type: Boolean,
                default: false,
            },

            allowMemberInvite: {
                type: Boolean,
                default: false,
            },

            taskPrefix: {
                type: String,
                default: "",
            },
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export type ProjectDocument = InferSchemaType<typeof projectSchema>;

export const Project = model("Project", projectSchema);