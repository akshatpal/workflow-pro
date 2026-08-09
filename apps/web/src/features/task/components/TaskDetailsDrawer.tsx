import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

import type {
    Task,
} from "../task.types";
import CommentList from "@/features/comment/components/CommentList";
import AttachmentUpload from "@/features/attachment/components/AttachmentUpload";
import AttachmentList from "@/features/attachment/components/AttachmentList";

interface Props {
    task: Task;
}

export default function TaskDetailsDrawer({
    task,
}: Props) {
    return (
        <div className="mx-auto max-w-5xl rounded-xl bg-white p-6 shadow lg:p-8">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        {task.title}
                    </h1>

                    <p className="mt-2 text-slate-500">
                        {task.description ||
                            "No description"}
                    </p>
                </div>

                <div className="space-y-3">
                    <PriorityBadge
                        priority={task.priority}
                    />

                    <StatusBadge
                        status={task.status}
                    />
                </div>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-xl font-semibold">
                        Assignee
                    </h2>

                    {task.assignee ? (
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                                {task.assignee.name
                                    .charAt(0)}
                            </div>

                            <div>
                                <p className="font-medium">
                                    {task.assignee.name}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-slate-500">
                            Unassigned
                        </p>
                    )}
                </div>

                <div>
                    <h2 className="mb-4 text-xl font-semibold">
                        Due Date
                    </h2>

                    <p>
                        {task.dueDate
                            ? new Date(
                                task.dueDate
                            ).toLocaleDateString()
                            : "Not Set"}
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="mb-4 text-xl font-semibold">
                    Labels
                </h2>

                <div className="flex flex-wrap gap-2">
                    {task.labels.length ===
                        0 ? (
                        <span className="text-slate-500">
                            No Labels
                        </span>
                    ) : (
                        task.labels.map(
                            (label) => (
                                <span
                                    key={label.id}
                                    style={{
                                        background:
                                            label.color,
                                    }}
                                    className="rounded-full px-3 py-1 text-sm text-white"
                                >
                                    {label.name}
                                </span>
                            )
                        )
                    )}
                </div>
            </div>

            <div className="mt-10">
                <h2 className="mb-4 text-xl font-semibold">
                    Activity
                </h2>

                <div className="space-y-4 rounded-lg border p-5">
                    <div className="flex justify-between">
                        <span>
                            Task Created
                        </span>

                        <span className="text-slate-500">
                            {new Date(
                                task.createdAt
                            ).toLocaleString()}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>
                            Last Updated
                        </span>

                        <span className="text-slate-500">
                            {new Date(
                                task.updatedAt
                            ).toLocaleString()}
                        </span>
                    </div>

                    {task.assignee && (
                        <div className="flex justify-between">
                            <span>
                                Assigned To
                            </span>

                            <span>
                                {task.assignee.name}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div>
                    <h2 className="mb-3 font-semibold">
                        Created
                    </h2>

                    <p className="text-slate-500">
                        {new Date(
                            task.createdAt
                        ).toLocaleString()}
                    </p>
                </div>

                <div>
                    <h2 className="mb-3 font-semibold">
                        Updated
                    </h2>

                    <p className="text-slate-500">
                        {new Date(
                            task.updatedAt
                        ).toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="mt-12">
                <h2 className="mb-6 text-2xl font-semibold">
                    Attachments
                </h2>

                <AttachmentUpload
                    taskId={task.id}
                />

                <div className="mt-6">
                    <AttachmentList
                        taskId={task.id}
                    />
                </div>
            </div>
            <div className="mt-12">
                <h2 className="mb-6 text-2xl font-semibold">
                    Comments
                </h2>

                <CommentList
                    taskId={task.id}
                />
            </div>
        </div>
    );
}