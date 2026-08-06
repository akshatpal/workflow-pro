import { HydratedDocument } from "mongoose";

import { Task, TaskDocument } from "../model/task.model.js";
import { TaskDto } from "../dto/task.dto.js";

import {
  CreateTaskInput,
  UpdateTaskInput,
  TaskQuery,
  ReorderTaskInput,
} from "../types/task.types.js";

import { Project } from "../../project/model/project.model.js";
import { Board } from "../../board/model/board.model.js";
import { Column } from "../../column/model/column.model.js";
import { UserModel } from "../../user/model/user.model.js";

import { NotFoundError } from "../../../common/errors/NotFoundError.js";

export class TaskService {
  static async createTask(
    payload: CreateTaskInput
  ) {
    const project = await Project.findById(
      payload.project
    );

    if (!project || project.isDeleted) {
      throw new NotFoundError(
        "Project not found"
      );
    }

    const board = await Board.findById(
      payload.board
    );

    if (!board || board.isDeleted) {
      throw new NotFoundError(
        "Board not found"
      );
    }

    const column = await Column.findById(
      payload.column
    );

    if (!column || column.isDeleted) {
      throw new NotFoundError(
        "Column not found"
      );
    }

    if (payload.assignee) {
      const assignee =
        await UserModel.findById(
          payload.assignee
        );

      if (!assignee || !assignee.isActive) {
        throw new NotFoundError(
          "Assignee not found"
        );
      }
    }

    const reporter =
      await UserModel.findById(
        payload.reporter
      );

    if (!reporter || !reporter.isActive) {
      throw new NotFoundError(
        "Reporter not found"
      );
    }

    const totalTasks =
      await Task.countDocuments({
        project: payload.project,
      });

    const taskNo = `${project.key}-${totalTasks + 1}`;

    const totalColumnTasks =
      await Task.countDocuments({
        column: payload.column,
        isDeleted: false,
      });

    const task = await Task.create({
      ...payload,

      taskNo,

      position: totalColumnTasks,
    });

    return TaskDto.toResponse(task as unknown as HydratedDocument<TaskDocument>);
  }

  static async getTasks(
    query: TaskQuery
  ) {
    const {
      page = 1,
      limit = 20,
      search,
      project,
      board,
      assignee,
      priority,
      status,
    } = query;

    const filter: any = {
      isDeleted: false,
    };

    if (project) {
      filter.project = project;
    }

    if (board) {
      filter.board = board;
    }

    if (assignee) {
      filter.assignee = assignee;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const skip =
      (page - 1) * limit;

    const tasks = await Task.find(filter)
      .populate(
        "assignee",
        "name email profilePic"
      )
      .populate(
        "reporter",
        "name email profilePic"
      )
      .sort({
        position: 1,
      })
      .skip(skip)
      .limit(limit);

    const total =
      await Task.countDocuments(filter);

    return {
      tasks:
        TaskDto.toResponseArray(tasks as unknown as HydratedDocument<TaskDocument>[]),

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(
          total / limit
        ),
      },
    };
  }

  static async getTaskById(id: string) {
    const task = await Task.findById(id)
      .populate(
        "assignee",
        "name email profilePic"
      )
      .populate(
        "reporter",
        "name email profilePic"
      );

    if (!task || task.isDeleted) {
      throw new NotFoundError(
        "Task not found"
      );
    }

    return TaskDto.toResponse(task as unknown as HydratedDocument<TaskDocument>);
  }

  static async updateTask(
    id: string,
    payload: UpdateTaskInput
  ) {
    const task = await Task.findById(id);

    if (!task || task.isDeleted) {
      throw new NotFoundError(
        "Task not found"
      );
    }

    Object.assign(task, payload);

    await task.save();

    return TaskDto.toResponse(task as unknown as HydratedDocument<TaskDocument>);
  }

  static async moveTask(
    taskId: string,
    columnId: string,
    position: number
  ) {
    const task =
      await Task.findById(taskId);

    if (!task || task.isDeleted) {
      throw new NotFoundError(
        "Task not found"
      );
    }

    const column =
      await Column.findById(columnId);

    if (!column || column.isDeleted) {
      throw new NotFoundError(
        "Column not found"
      );
    }

    task.column = columnId as any;
    task.position = position;

    await task.save();

    return TaskDto.toResponse(task as unknown as HydratedDocument<TaskDocument>);
  }

  static async deleteTask(id: string) {
    const task = await Task.findById(id);

    if (!task || task.isDeleted) {
      throw new NotFoundError(
        "Task not found"
      );
    }

    task.isDeleted = true;

    await task.save();

    return {
      message:
        "Task deleted successfully",
    };
  }

  static async reorderTask(
    payload: ReorderTaskInput
  ) {
    const updates = payload.tasks.map(
      (task) =>
        Task.updateOne(
          {
            _id: task.id,

            isDeleted: false,
          },
          {
            column:
              payload.destinationColumnId,

            position:
              task.position,
          }
        )
    );

    await Promise.all(updates);

    return true;
  }
}