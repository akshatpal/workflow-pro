import { Request, Response, NextFunction } from "express";

import { ProjectService } from "../service/project.service.js";
import { successResponse } from "../../../common/response/apiResponse.js";

export class ProjectController {
  static async createProject(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const project = await ProjectService.createProject(req.body);

      return successResponse(
        res,
        201,
        "Project created successfully",
        project
      );
    } catch (error) {
      next(error);
    }
  }

  static async getProjects(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await ProjectService.getProjects({
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
        search: req.query.search as string,
        status: req.query.status as any,
        sortBy: req.query.sortBy as string,
        order: req.query.order as "asc" | "desc",
      });

      return successResponse(
        res,
        200,
        "Projects fetched successfully",
        result
      );
    } catch (error) {
      next(error);
    }
  }

  static async getProjectById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const project = await ProjectService.getProjectById(req.params.id as string);

      return successResponse(
        res,
        200,
        "Project fetched successfully",
        project
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateProject(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const project = await ProjectService.updateProject(
        req.params.id as string,
        req.body
      );

      return successResponse(
        res,
        200,
        "Project updated successfully",
        project
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteProject(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await ProjectService.deleteProject(req.params.id as string);

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