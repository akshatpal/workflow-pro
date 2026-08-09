import { HydratedDocument } from "mongoose";

import {
  LabelDocument,
} from "../model/label.model.js";

export class LabelDto {
  static toResponse(
    label: HydratedDocument<LabelDocument>
  ) {
    return {
      id: label._id.toString(),

      name: label.name,

      color: label.color,

      project: label.project,

      createdBy: label.createdBy,

      createdAt: label.createdAt,

      updatedAt: label.updatedAt,
    };
  }

  static toResponseArray(
    labels: HydratedDocument<LabelDocument>[]
  ) {
    return labels.map((label) =>
      this.toResponse(label)
    );
  }
}