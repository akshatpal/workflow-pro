import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { TaskCard as Task } from "../board.types";

interface Props {
    task: Task;
    columnId: string;
}

export default function TaskCard({
    task,
    columnId,
}: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,

        data: {
            type: "TASK",

            task,

            columnId,
        },
    });

    const style = {
        transform:
            CSS.Transform.toString(
                transform
            ),

        transition,

        opacity: isDragging
            ? 0
            : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="mb-3 cursor-grab rounded-lg bg-white p-4 shadow transition-all duration-200 hover:shadow-lg active:cursor-grabbing"
        >
            <h3 className="font-medium">
                {task.title}
            </h3>

            <div className="mt-3 flex items-center justify-between">
                <span className="rounded bg-slate-100 px-2 py-1 text-xs">
                    {task.priority}
                </span>

                {task.assignee && (
                    <span className="text-xs text-slate-500">
                        {task.assignee.name}
                    </span>
                )}
            </div>
        </div>
    );
}