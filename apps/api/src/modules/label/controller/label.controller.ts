import { Request, Response, NextFunction } from "express";

import { LabelService } from "../service/label.service.js";

import { successResponse } from "../../../common/response/apiResponse.js";

import { getCurrentUser } from "../../../common/utils/getCurrentUser.js";

export class LabelController {
  static async createLabel(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const currentUser =
        getCurrentUser(req);

      const label =
        await LabelService.createLabel({
          ...req.body,
          createdBy:
            currentUser.userId,
        });

      return successResponse(
        res,
        201,
        "Label created successfully",
        label
      );
    } catch (error) {
      next(error);
    }
  }

  static async getLabels(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const labels =
        await LabelService.getLabels(
          req.params.projectId as string
        );

      return successResponse(
        res,
        200,
        "Labels fetched successfully",
        labels
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateLabel(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const label =
        await LabelService.updateLabel(
          req.params.id as string,
          req.body
        );

      return successResponse(
        res,
        200,
        "Label updated successfully",
        label
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteLabel(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await LabelService.deleteLabel(
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