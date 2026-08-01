import { HydratedDocument } from "mongoose";
import { Comment, CommentDocument } from "../model/comment.model.js";
import { CommentDto } from "../dto/comment.dto.js";

import {
  CreateCommentInput,
  UpdateCommentInput,
} from "../types/comment.types.js";

import { Task } from "../../task/model/task.model.js";
import { UserModel } from "../../user/model/user.model.js";

import { NotFoundError } from "../../../common/errors/NotFoundError.js";

export class CommentService {
  static async createComment(
    payload: CreateCommentInput
  ) {
    const task = await Task.findById(payload.task);

    if (!task || task.isDeleted) {
      throw new NotFoundError("Task not found");
    }

    const author = await UserModel.findById(
      payload.author
    );

    if (!author || !author.isActive) {
      throw new NotFoundError("User not found");
    }

    const comment = await Comment.create({
      task: payload.task,
      author: payload.author,
      message: payload.message,
    });

    const result = await Comment.findById(comment._id)
      .populate(
        "author",
        "name email profilePic"
      );

    return CommentDto.toResponse(result! as unknown as HydratedDocument<CommentDocument>);
  }

  static async getComments(taskId: string) {
    const task = await Task.findById(taskId);

    if (!task || task.isDeleted) {
      throw new NotFoundError("Task not found");
    }

    const comments = await Comment.find({
      task: taskId,
      isDeleted: false,
    })
      .populate(
        "author",
        "name email profilePic designation"
      )
      .sort({
        createdAt: 1,
      });

    return CommentDto.toResponseArray(comments as unknown as HydratedDocument<CommentDocument>[]);
  }

  static async getCommentById(id: string) {
    const comment = await Comment.findById(id)
      .populate(
        "author",
        "name email profilePic designation"
      );

    if (!comment || comment.isDeleted) {
      throw new NotFoundError(
        "Comment not found"
      );
    }

    return CommentDto.toResponse(comment as unknown as HydratedDocument<CommentDocument>);
  }

  static async updateComment(
    id: string,
    payload: UpdateCommentInput
  ) {
    const comment = await Comment.findById(id);

    if (!comment || comment.isDeleted) {
      throw new NotFoundError(
        "Comment not found"
      );
    }

    comment.message = payload.message;
    comment.edited = true;

    await comment.save();

    const result = await Comment.findById(id)
      .populate(
        "author",
        "name email profilePic designation"
      );

    return CommentDto.toResponse(result! as unknown as HydratedDocument<CommentDocument>);
  }

  static async deleteComment(id: string) {
    const comment = await Comment.findById(id);

    if (!comment || comment.isDeleted) {
      throw new NotFoundError(
        "Comment not found"
      );
    }

    comment.isDeleted = true;

    await comment.save();

    return {
      message: "Comment deleted successfully",
    };
  }
}