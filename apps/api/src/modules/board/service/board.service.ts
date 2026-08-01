import { HydratedDocument } from "mongoose";
import { Board, BoardDocument } from "../model/board.model.js";
import { BoardDto } from "../dto/board.dto.js";
import {
  CreateBoardInput,
  UpdateBoardInput,
  BoardQuery,
} from "../types/board.types.js";

import { Project } from "../../project/model/project.model.js";
import { ColumnService } from "../../column/service/column.service.js";

import { NotFoundError } from "../../../common/errors/NotFoundError.js";

export class BoardService {
  static async createBoard(
    payload: CreateBoardInput
    ) {
    const project = await Project.findById(
        payload.project
    );

    if (!project || project.isDeleted) {
        throw new NotFoundError("Project not found");
    }

    const totalBoards =
        await Board.countDocuments({
        project: payload.project,
        isDeleted: false,
        });

    const board = await Board.create({
        name: payload.name,
        description: payload.description,
        type: payload.type,
        project: payload.project,
        createdBy: payload.createdBy,
        position: totalBoards,
        isDefault: totalBoards === 0,
    });

    // Automatically create default columns
    await ColumnService.createDefaultColumns(
        board._id.toString()
    );

    return BoardDto.toResponse(board as unknown as HydratedDocument<BoardDocument>);
    }

  static async getBoards(
    projectId: string,
    query: BoardQuery
  ) {
    const {
      page = 1,
      limit = 10,
      search,
    } = query;

    const filter: any = {
      project: projectId,
      isDeleted: false,
    };

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const skip = (page - 1) * limit;

    const boards = await Board.find(filter)
      .sort({
        position: 1,
      })
      .skip(skip)
      .limit(limit);

    const total =
      await Board.countDocuments(filter);

    return {
      boards:
        BoardDto.toResponseArray(boards as unknown as HydratedDocument<BoardDocument>[]),

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

  static async getBoardById(id: string) {
    const board = await Board.findById(id);

    if (!board || board.isDeleted) {
      throw new NotFoundError(
        "Board not found"
      );
    }

    return BoardDto.toResponse(board as unknown as HydratedDocument<BoardDocument>);
  }

  static async updateBoard(
    id: string,
    payload: UpdateBoardInput
  ) {
    const board = await Board.findById(id);

    if (!board || board.isDeleted) {
      throw new NotFoundError(
        "Board not found"
      );
    }

    if (payload.name !== undefined) {
      board.name = payload.name;
    }

    if (
      payload.description !== undefined
    ) {
      board.description =
        payload.description;
    }

    if (payload.type !== undefined) {
      board.type = payload.type;
    }

    if (
      payload.isDefault !== undefined
    ) {
      if (payload.isDefault) {
        await Board.updateMany(
          {
            project: board.project,
          },
          {
            isDefault: false,
          }
        );
      }

      board.isDefault =
        payload.isDefault;
    }

    await board.save();

    return BoardDto.toResponse(board as unknown as HydratedDocument<BoardDocument>);
  }

  static async deleteBoard(id: string) {
    const board = await Board.findById(id);

    if (!board || board.isDeleted) {
      throw new NotFoundError(
        "Board not found"
      );
    }

    board.isDeleted = true;

    await board.save();

    return {
      message:
        "Board deleted successfully",
    };
  }
}