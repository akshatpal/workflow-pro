import { Request, Response, NextFunction } from "express";

import { BoardService } from "../service/board.service.js";
import { successResponse } from "../../../common/response/apiResponse.js";

export class BoardController {
  static async createBoard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const board = await BoardService.createBoard(req.body);

      return successResponse(
        res,
        201,
        "Board created successfully",
        board
      );
    } catch (error) {
      next(error);
    }
  }

  static async getBoards(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const boards = await BoardService.getBoards(
        req.params.projectId as string,
        {
          page: req.query.page
            ? Number(req.query.page)
            : 1,

          limit: req.query.limit
            ? Number(req.query.limit)
            : 10,

          search: req.query.search as string,
        }
      );

      return successResponse(
        res,
        200,
        "Boards fetched successfully",
        boards
      );
    } catch (error) {
      next(error);
    }
  }

  static async getBoardById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const board =
        await BoardService.getBoardById(
          req.params.id as string
        );

      return successResponse(
        res,
        200,
        "Board fetched successfully",
        board
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateBoard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const board =
        await BoardService.updateBoard(
          req.params.id as string,
          req.body
        );

      return successResponse(
        res,
        200,
        "Board updated successfully",
        board
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteBoard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await BoardService.deleteBoard(
          req.params.id as string
        );

      return successResponse(
        res,
        200,
        result.message
      );
    } catch (error) {
      next(error);
    }
  }
}