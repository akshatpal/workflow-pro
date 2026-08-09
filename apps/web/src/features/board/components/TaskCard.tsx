import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Task } from "@/features/task/task.types";

import PriorityBadge from "@/features/task/components/PriorityBadge";
import StatusBadge from "@/features/task/components/StatusBadge";
import TaskActions from "@/features/task/components/TaskActions";
import EditTaskModal from "@/features/task/components/EditTaskModal";
import DeleteTaskDialog from "@/features/task/components/DeleteTaskDialog";
import { Link } from "react-router-dom";

interface Props {
  task: Task;
  columnId: string;
}

export default function TaskCard({
  task,
  columnId,
}: Props) {
  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

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
    transform: CSS.Transform.toString(
      transform
    ),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <>
      <EditTaskModal
        open={editOpen}
        task={task}
        onClose={() =>
          setEditOpen(false)
        }
      />

      <DeleteTaskDialog
        open={deleteOpen}
        taskId={task.id}
        onClose={() =>
          setDeleteOpen(false)
        }
      />

      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="mb-3 cursor-grab rounded-lg bg-white p-4 shadow transition-all duration-200 hover:shadow-lg active:cursor-grabbing"
      >
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/tasks/${task.id}`}
            className="font-medium text-blue-600 hover:underline"
            >
            {task.title}
          </Link>

          <TaskActions
            onEdit={() =>
              setEditOpen(true)
            }
            onDelete={() =>
              setDeleteOpen(true)
            }
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <PriorityBadge
            priority={task.priority}
          />

          <StatusBadge
            status={task.status}
          />
        </div>

        {task.assignee && (
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
              {task.assignee.name
                .charAt(0)
                .toUpperCase()}
            </div>

            <span>
              {task.assignee.name}
            </span>
          </div>
        )}

        {task.dueDate && (
          <div className="mt-3 text-xs text-slate-500">
            Due:{" "}
            {new Date(
              task.dueDate
            ).toLocaleDateString()}
          </div>
        )}
      </div>
    </>
  );
}