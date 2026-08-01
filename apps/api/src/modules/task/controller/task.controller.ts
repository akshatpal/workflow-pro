import { Request, Response, NextFunction } from "express";

import { TaskService } from "../service/task.service.js";
import { successResponse } from "../../../common/response/apiResponse.js";

export class TaskController {
  static async createTask(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const task = await TaskService.createTask(req.body);

      return successResponse(
        res,
        201,
        "Task created successfully",
        task
      );
    } catch (error) {
      next(error);
    }
  }

  static async getTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const tasks = await TaskService.getTasks({
        project: req.query.project as string,
        board: req.query.board as string,
        assignee: req.query.assignee as string,
        priority: req.query.priority as any,
        status: req.query.status as any,
        search: req.query.search as string,
        page: req.query.page
          ? Number(req.query.page)
          : 1,
        limit: req.query.limit
          ? Number(req.query.limit)
          : 20,
      });

      return successResponse(
        res,
        200,
        "Tasks fetched successfully",
        tasks
      );
    } catch (error) {
      next(error);
    }
  }

  static async getTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const task =
        await TaskService.getTaskById(
          req.params.id as string
        );

      return successResponse(
        res,
        200,
        "Task fetched successfully",
        task
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const task =
        await TaskService.updateTask(
          req.params.id as string,
          req.body
        );

      return successResponse(
        res,
        200,
        "Task updated successfully",
        task
      );
    } catch (error) {
      next(error);
    }
  }

  static async moveTask(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const task =
        await TaskService.moveTask(
          req.params.id as string,
          req.body.columnId,
          req.body.position
        );

      return successResponse(
        res,
        200,
        "Task moved successfully",
        task
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await TaskService.deleteTask(
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