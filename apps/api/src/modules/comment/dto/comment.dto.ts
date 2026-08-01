import { HydratedDocument } from "mongoose";
import { CommentDocument } from "../model/comment.model.js";

export class CommentDto {
  static toResponse(
    comment: HydratedDocument<CommentDocument>
  ) {
    return {
      id: comment._id.toString(),

      task: comment.task,

      author: comment.author,

      message: comment.message,

      edited: comment.edited,

      createdAt: comment.createdAt,

      updatedAt: comment.updatedAt,
    };
  }

  static toResponseArray(
    comments: HydratedDocument<CommentDocument>[]
  ) {
    return comments.map((comment) =>
      this.toResponse(comment)
    );
  }
}