import { Schema, Types, model, HydratedDocument } from "mongoose";

export interface LabelDocument {
    name: string;

    color: string;

    project: Types.ObjectId;

    createdBy: Types.ObjectId;

    isDeleted: boolean;

    createdAt: Date;

    updatedAt: Date;
}

const labelSchema = new Schema<LabelDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },

        color: {
            type: String,
            required: true,
            default: "#3B82F6",
        },

        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Label = model<LabelDocument>(
    "Label",
    labelSchema
);

export type LabelHydratedDocument =
    HydratedDocument<LabelDocument>;