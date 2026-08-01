import { HydratedDocument } from "mongoose";
import { ColumnDocument } from "../model/column.model.js";

export class ColumnDto {
  static toResponse(column: HydratedDocument<ColumnDocument>) {
    return {
      id: column._id.toString(),
      name: column.name,
      board: column.board,
      position: column.position,
      color: column.color,
      wipLimit: column.wipLimit,
      isCollapsed: column.isCollapsed,
      createdAt: column.createdAt,
      updatedAt: column.updatedAt,
    };
  }

  static toResponseArray(
    columns: HydratedDocument<ColumnDocument>[]
  ) {
    return columns.map((column) =>
      this.toResponse(column)
    );
  }
}