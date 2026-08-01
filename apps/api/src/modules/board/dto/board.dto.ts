import { HydratedDocument } from "mongoose";
import { BoardDocument } from "../model/board.model.js";

export class BoardDto {
  static toResponse(board: HydratedDocument<BoardDocument>) {
    return {
      id: board._id.toString(),
      name: board.name,
      description: board.description,
      type: board.type,
      project: board.project,
      isDefault: board.isDefault,
      position: board.position,
      createdBy: board.createdBy,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    };
  }

  static toResponseArray(
    boards: HydratedDocument<BoardDocument>[]
  ) {
    return boards.map((board) =>
      this.toResponse(board)
    );
  }
}