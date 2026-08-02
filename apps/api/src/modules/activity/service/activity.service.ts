import { Activity, ActivityType } from "../model/activity.model.js";

export class ActivityService {
  static async logActivity(
    task: string,
    user: string,
    type: ActivityType,
    message: string,
    metadata: Record<string, unknown> = {}
  ) {
    await Activity.create({
      task,
      user,
      type,
      message,
      metadata,
    });
  }

  static async getTaskActivities(
    taskId: string
  ) {
    return Activity.find({
      task: taskId,
    })
      .populate(
        "user",
        "name email profilePic"
      )
      .sort({
        createdAt: -1,
      });
  }
}