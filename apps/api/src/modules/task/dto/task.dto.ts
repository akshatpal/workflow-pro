import { HydratedDocument } from "mongoose";
import { TaskDocument } from "../model/task.model.js";

export class TaskDto {
  static toResponse(task: HydratedDocument<TaskDocument>) {
    return {
      id: task._id.toString(),

      taskNo: task.taskNo,

      title: task.title,

      description: task.description,

      project: task.project,

      board: task.board,

      column: task.column,

      assignee: task.assignee,

      reporter: task.reporter,

      priority: task.priority,

      status: task.status,

      storyPoints: task.storyPoints,

      dueDate: task.dueDate,

      labels: task.labels,

      position: task.position,

      createdAt: task.createdAt,

      updatedAt: task.updatedAt,
    };
  }

  static toResponseArray(
    tasks: HydratedDocument<TaskDocument>[]
  ) {
    return tasks.map((task) =>
      this.toResponse(task)
    );
  }
}