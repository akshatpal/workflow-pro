import {
  Request,
  Response,
  NextFunction,
} from "express";

import { CommentService } from "../service/comment.service.js";
import { successResponse } from "../../../common/response/apiResponse.js";

export class CommentController {
  static async createComment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const comment =
        await CommentService.createComment(
          req.body
        );

      return successResponse(
        res,
        201,
        "Comment created successfully",
        comment
      );
    } catch (error) {
      next(error);
    }
  }

  static async getComments(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const comments =
        await CommentService.getComments(
          req.params.taskId as string
        );

      return successResponse(
        res,
        200,
        "Comments fetched successfully",
        comments
      );
    } catch (error) {
      next(error);
    }
  }

  static async getCommentById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const comment =
        await CommentService.getCommentById(
          req.params.id as string
        );

      return successResponse(
        res,
        200,
        "Comment fetched successfully",
        comment
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateComment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const comment =
        await CommentService.updateComment(
          req.params.id as string,
          req.body
        );

      return successResponse(
        res,
        200,
        "Comment updated successfully",
        comment
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteComment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await CommentService.deleteComment(
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