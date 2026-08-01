import { HydratedDocument } from "mongoose";
import { Column, ColumnDocument } from "../model/column.model.js";
import { Board } from "../../board/model/board.model.js";
import { ColumnDto } from "../dto/column.dto.js";

import {
  CreateColumnInput,
  UpdateColumnInput,
} from "../types/column.types.js";

import { NotFoundError } from "../../../common/errors/NotFoundError.js";

export class ColumnService {
  static async createColumn(
    payload: CreateColumnInput
  ) {
    const board = await Board.findById(payload.board);

    if (!board || board.isDeleted) {
      throw new NotFoundError("Board not found");
    }

    const totalColumns = await Column.countDocuments({
      board: payload.board,
      isDeleted: false,
    });

    const column = await Column.create({
      name: payload.name,
      board: payload.board,
      color: payload.color,
      position: totalColumns,
    });

    return ColumnDto.toResponse(column as unknown as HydratedDocument<ColumnDocument>);
  }

  static async getColumns(boardId: string) {
    const columns = await Column.find({
      board: boardId,
      isDeleted: false,
    }).sort({
      position: 1,
    });

    return ColumnDto.toResponseArray(columns as unknown as HydratedDocument<ColumnDocument>[]);
  }

  static async getColumnById(id: string) {
    const column = await Column.findById(id);

    if (!column || column.isDeleted) {
      throw new NotFoundError("Column not found");
    }

    return ColumnDto.toResponse(column as unknown as HydratedDocument<ColumnDocument>);
  }

  static async updateColumn(
    id: string,
    payload: UpdateColumnInput
  ) {
    const column = await Column.findById(id);

    if (!column || column.isDeleted) {
      throw new NotFoundError("Column not found");
    }

    if (payload.name !== undefined) {
      column.name = payload.name;
    }

    if (payload.color !== undefined) {
      column.color = payload.color;
    }

    if (payload.position !== undefined) {
      column.position = payload.position;
    }

    if (payload.wipLimit !== undefined) {
      column.wipLimit = payload.wipLimit;
    }

    if (payload.isCollapsed !== undefined) {
      column.isCollapsed =
        payload.isCollapsed;
    }

    await column.save();

    return ColumnDto.toResponse(column as unknown as HydratedDocument<ColumnDocument>);
  }

  static async deleteColumn(id: string) {
    const column = await Column.findById(id);

    if (!column || column.isDeleted) {
      throw new NotFoundError("Column not found");
    }

    column.isDeleted = true;

    await column.save();

    return {
      message: "Column deleted successfully",
    };
  }

  static async createDefaultColumns(
    boardId: string
  ) {
    const defaults = [
      {
        name: "Todo",
        position: 0,
        color: "#2563EB",
      },
      {
        name: "In Progress",
        position: 1,
        color: "#F59E0B",
      },
      {
        name: "Review",
        position: 2,
        color: "#8B5CF6",
      },
      {
        name: "Done",
        position: 3,
        color: "#22C55E",
      },
    ];

    const createdColumns = [];

    for (const item of defaults) {
      const column = await Column.create({
        board: boardId,
        name: item.name,
        position: item.position,
        color: item.color,
      });

      createdColumns.push(column);
    }

    return ColumnDto.toResponseArray(
      createdColumns as unknown as HydratedDocument<ColumnDocument>[]
    );
  }
}