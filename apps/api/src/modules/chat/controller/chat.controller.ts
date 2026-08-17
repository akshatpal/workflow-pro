import { Request, Response, NextFunction } from "express";

import { ChatService } from "../service/chat.service.js";
import { successResponse } from "../../../common/response/apiResponse.js";
import { getCurrentUser } from "../../../common/utils/getCurrentUser.js";

export class ChatController {
  static async createConversation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const conversation =
        await ChatService.createConversation(req.body);

      return successResponse(
        res,
        201,
        "Conversation created successfully",
        conversation
      );
    } catch (error) {
      next(error);
    }
  }

  static async getConversations(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const currentUser = getCurrentUser(req);
      const userId = (req.params.userId as string) || currentUser.userId;

      const conversations =
        await ChatService.getConversations(userId);

      return successResponse(
        res,
        200,
        "Conversations fetched successfully",
        conversations
      );
    } catch (error) {
      next(error);
    }
  }

  static async getMessages(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const messages =
        await ChatService.getMessages(
          req.params.conversationId as string
        );

      return successResponse(
        res,
        200,
        "Messages fetched successfully",
        messages
      );
    } catch (error) {
      next(error);
    }
  }

  static async sendMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const message =
        await ChatService.sendMessage(req.body);

      return successResponse(
        res,
        201,
        "Message sent successfully",
        message
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const message =
        await ChatService.updateMessage(
          req.params.id as string,
          req.body
        );

      return successResponse(
        res,
        200,
        "Message updated successfully",
        message
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await ChatService.deleteMessage(
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

  static async addReaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const message =
        await ChatService.addReaction(
          req.params.id as string,
          req.body.userId,
          req.body.emoji
        );

      return successResponse(
        res,
        200,
        "Reaction added",
        message
      );
    } catch (error) {
      next(error);
    }
  }

  static async removeReaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const message =
        await ChatService.removeReaction(
          req.params.id as string,
          req.body.userId,
          req.body.emoji
        );

      return successResponse(
        res,
        200,
        "Reaction removed",
        message
      );
    } catch (error) {
      next(error);
    }
  }
}