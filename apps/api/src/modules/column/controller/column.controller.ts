import {
  Request,
  Response,
  NextFunction,
} from "express";

import { ColumnService } from "../service/column.service.js";
import { successResponse } from "../../../common/response/apiResponse.js";

export class ColumnController {
  static async createColumn(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const column =
        await ColumnService.createColumn(
          req.body
        );

      return successResponse(
        res,
        201,
        "Column created successfully",
        column
      );
    } catch (error) {
      next(error);
    }
  }

  static async getColumns(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const columns =
        await ColumnService.getColumns(
          req.params.boardId as string
        );

      return successResponse(
        res,
        200,
        "Columns fetched successfully",
        columns
      );
    } catch (error) {
      next(error);
    }
  }

  static async getColumnById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const column =
        await ColumnService.getColumnById(
          req.params.id as string
        );

      return successResponse(
        res,
        200,
        "Column fetched successfully",
        column
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateColumn(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const column =
        await ColumnService.updateColumn(
          req.params.id as string,
          req.body
        );

      return successResponse(
        res,
        200,
        "Column updated successfully",
        column
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteColumn(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await ColumnService.deleteColumn(
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