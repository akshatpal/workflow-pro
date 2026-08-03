import { Project, ProjectStatus } from "../../project/model/project.model.js";
import { Task, TaskStatus } from "../../task/model/task.model.js";

import { DashboardDto } from "../dto/dashboard.dto.js";

export class DashboardService {
    static async getDashboard(userId: string) {
        const [
            statistics,
            recentProjects,
            myTasks,
            recentActivities,
        ] = await Promise.all([
            this.getStatistics(),
            this.getRecentProjects(),
            this.getMyTasks(userId),
            this.getRecentActivities(userId),
        ]);

        return DashboardDto.dashboard({
            statistics,
            recentProjects,
            myTasks,
            recentActivities,
        });
    }

    static async getStatistics() {
        const [
            projectStats,
            taskStats,
        ] = await Promise.all([
            Project.aggregate([
                {
                    $match: {
                        isDeleted: false,
                    },
                },
                {
                    $group: {
                        _id: "$status",

                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]),

            Task.aggregate([
                {
                    $match: {
                        isDeleted: false,
                    },
                },
                {
                    $group: {
                        _id: "$status",

                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]),
        ]);

        const statistics = {
            totalProjects: 0,

            activeProjects: 0,

            archivedProjects: 0,

            totalTasks: 0,

            todoTasks: 0,

            inProgressTasks: 0,

            completedTasks: 0,
        };

        projectStats.forEach((item) => {
            statistics.totalProjects += item.count;

            if (item._id === "ACTIVE") {
                statistics.activeProjects =
                    item.count;
            }

            if (item._id === "ARCHIVED") {
                statistics.archivedProjects =
                    item.count;
            }
        });

        taskStats.forEach((item) => {
            statistics.totalTasks += item.count;

            if (item._id === "TODO") {
                statistics.todoTasks =
                    item.count;
            }

            if (
                item._id ===
                "IN_PROGRESS"
            ) {
                statistics.inProgressTasks =
                    item.count;
            }

            if (item._id === "DONE") {
                statistics.completedTasks =
                    item.count;
            }
        });

        return statistics;
    }

    static async getRecentProjects() {
        const projects =
            await Project.find({
                isDeleted: false,
            })
                .populate(
                    "owner",
                    "name email profilePic"
                )
                .sort({
                    updatedAt: -1,
                })
                .limit(6);

        return projects.map(
            (project) => ({
                id: project._id,

                name: project.name,

                key: project.key,

                avatar: project.avatar,

                owner: project.owner,

                members:
                    project.members.length,

                updatedAt:
                    project.updatedAt,
            })
        );
    }

    static async getMyTasks(
        userId: string
    ) {
        const tasks =
            await Task.find({
                assignee: userId,

                isDeleted: false,
            })
                .populate(
                    "project",
                    "name key"
                )
                .sort({
                    dueDate: 1,
                })
                .limit(8);

        return tasks.map((task) => ({
            id: task._id,

            title: task.title,

            priority:
                task.priority,

            status:
                task.status,

            dueDate:
                task.dueDate,

            project:
                task.project,
        }));
    }

    static async getRecentActivities(
        userId: string
    ) {
        const tasks =
            await Task.find({
                assignee: userId,

                isDeleted: false,
            })
                .populate(
                    "project",
                    "name"
                )
                .sort({
                    updatedAt: -1,
                })
                .limit(10);

        return tasks.map((task) => ({
            id: task._id,

            action:
                "Task Updated",

            title:
                task.title,

            project:
                task.project,

            time:
                task.updatedAt,
        }));
    }
}