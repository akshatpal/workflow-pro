import { HydratedDocument } from "mongoose";

import { Label, LabelDocument } from "../model/label.model.js";
import { LabelDto } from "../dto/label.dto.js";

import {
  CreateLabelInput,
  UpdateLabelInput,
} from "../types/label.types.js";

import { Project } from "../../project/model/project.model.js";

import { NotFoundError } from "../../../common/errors/NotFoundError.js";

export class LabelService {
  static async createLabel(
    payload: CreateLabelInput
  ) {
    const project =
      await Project.findById(
        payload.project
      );

    if (
      !project ||
      project.isDeleted
    ) {
      throw new NotFoundError(
        "Project not found"
      );
    }

    const label =
      await Label.create({
        name: payload.name,

        color: payload.color,

        project:
          payload.project,

        createdBy:
          payload.createdBy,
      });

    return LabelDto.toResponse(
      label as HydratedDocument<LabelDocument>
    );
  }

  static async getLabels(
    projectId: string
  ) {
    const labels =
      await Label.find({
        project: projectId,

        isDeleted: false,
      }).sort({
        createdAt: -1,
      });

    return LabelDto.toResponseArray(
      labels as HydratedDocument<LabelDocument>[]
    );
  }

  static async updateLabel(
    id: string,
    payload: UpdateLabelInput
  ) {
    const label =
      await Label.findById(id);

    if (
      !label ||
      label.isDeleted
    ) {
      throw new NotFoundError(
        "Label not found"
      );
    }

    if (
      payload.name !== undefined
    ) {
      label.name =
        payload.name;
    }

    if (
      payload.color !==
      undefined
    ) {
      label.color =
        payload.color;
    }

    await label.save();

    return LabelDto.toResponse(
      label as HydratedDocument<LabelDocument>
    );
  }

  static async deleteLabel(
    id: string
  ) {
    const label =
      await Label.findById(id);

    if (
      !label ||
      label.isDeleted
    ) {
      throw new NotFoundError(
        "Label not found"
      );
    }

    label.isDeleted = true;

    await label.save();

    return {
      message:
        "Label deleted successfully",
    };
  }
}