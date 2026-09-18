import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import {
  taskSchema,
  type TaskFormValues,
} from "../taskSchema";
import { useCreateTaskMutation } from "../taskApi";
import { useGetProjectsQuery } from "@/features/project/projectApi";
import {
  useGetBoardsQuery,
  useGetBoardByIdQuery,
} from "@/features/board/boardApi";
import { useCreateNotificationMutation } from "@/features/notification/notificationApi";
import { useAppSelector } from "@/store/hooks";
import TaskForm from "./TaskForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateTaskDashboardModal({
  open,
  onClose,
}: Props) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedBoardId, setSelectedBoardId] = useState<string>("");

  const { data: projectsData, isLoading: isProjectsLoading } =
    useGetProjectsQuery({ limit: 100 });
  const projects = projectsData?.data?.projects || [];

  // Auto-select first project
  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const { data: boardsData, isLoading: isBoardsLoading } = useGetBoardsQuery(
    selectedProjectId,
    { skip: !selectedProjectId }
  );
  const boards = boardsData?.data?.boards || [];

  // Auto-select first board when project changes
  useEffect(() => {
    if (boards.length > 0) {
      const exists = boards.some((b) => b.id === selectedBoardId);
      if (!exists || !selectedBoardId) {
        setSelectedBoardId(boards[0].id);
      }
    } else {
      setSelectedBoardId("");
    }
  }, [boards, selectedBoardId]);

  // Fetch board details to resolve columns
  const { data: boardDetailsData, isLoading: isBoardDetailsLoading } =
    useGetBoardByIdQuery(selectedBoardId, { skip: !selectedBoardId });

  const columns = boardDetailsData?.data?.columns || [];
  const todoColumn =
    columns.find((col) => {
      const lower = col.name.toLowerCase().replace(/[\s-_]/g, "");
      return lower === "todo" || lower.includes("todo");
    }) || columns[0];

  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [createNotification] = useCreateNotificationMutation();
  const currentUserId = useAppSelector((state) => state.auth.user?._id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: "MEDIUM",
    },
  });

  const onSubmit = async (values: TaskFormValues) => {
    if (!todoColumn) return;

    try {
      const task = await createTask({
        ...values,
        column: todoColumn.id,
      }).unwrap();

      if (values.assignee && currentUserId) {
        createNotification({
          user: values.assignee,
          sender: currentUserId,
          title: "Task Assigned",
          message: `You have been assigned task "${values.title}".`,
          type: "TASK_ASSIGNED",
          entityId: task.id,
          entityType: "Task",
        });
      }

      reset();
      onClose();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Create Task
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        {isProjectsLoading ? (
          <p className="text-sm text-slate-500">Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-slate-500">
            <p className="font-medium">No projects available</p>
            <p className="text-xs text-slate-400 mt-1">
              Please create a project and board first before adding tasks.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Project <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => {
                    setSelectedProjectId(e.target.value);
                    setSelectedBoardId("");
                  }}
                  className="w-full rounded-lg border p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name} ({project.key})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Board <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedBoardId}
                  onChange={(e) => setSelectedBoardId(e.target.value)}
                  disabled={isBoardsLoading || boards.length === 0}
                  className="w-full rounded-lg border p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  {isBoardsLoading ? (
                    <option value="">Loading boards...</option>
                  ) : boards.length === 0 ? (
                    <option value="">No boards found</option>
                  ) : (
                    boards.map((board) => (
                      <option key={board.id} value={board.id}>
                        {board.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {todoColumn && (
              <div className="rounded-lg bg-blue-50 border border-blue-200 px-3.5 py-2.5 text-sm text-blue-900 flex items-center justify-between">
                <span className="text-xs text-blue-700">Target Column:</span>
                <span className="font-semibold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded text-xs uppercase tracking-wide">
                  {todoColumn.name}
                </span>
              </div>
            )}

            <TaskForm register={register} />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isCreating || !todoColumn || isBoardDetailsLoading}
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 transition"
              >
                {isCreating ? "Creating..." : "Create Task"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
