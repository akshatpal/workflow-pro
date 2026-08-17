import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  taskSchema,
  type TaskFormValues,
} from "../taskSchema";

import {
  useCreateTaskMutation,
} from "../taskApi";

import {
  useCreateNotificationMutation,
} from "@/features/notification/notificationApi";

import { useAppSelector } from "@/store/hooks";

import TaskForm from "./TaskForm";

interface Props {
  open: boolean;

  columnId: string;

  onClose: () => void;
}

export default function CreateTaskModal({
  open,
  columnId,
  onClose,
}: Props) {
  const [
    createTask,
    { isLoading },
  ] = useCreateTaskMutation();

  const [createNotification] =
    useCreateNotificationMutation();

  const currentUserId = useAppSelector(
    (state) => state.auth.user?._id
  );

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<TaskFormValues>({
    resolver:
      zodResolver(taskSchema),

    defaultValues: {
      priority: "MEDIUM",
    },
  });

  const onSubmit = async (
    values: TaskFormValues
  ) => {
    const task = await createTask({
      ...values,

      column: columnId,
    }).unwrap();

    // Fire notification to the assignee
    if (values.assignee) {
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
  };


  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-xl bg-white p-8">
        <h2 className="mb-6 text-2xl font-bold">
          Create Task
        </h2>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-6"
        >
          <TaskForm
            register={register}
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-3"
            >
              Cancel
            </button>

            <button
  disabled={isLoading}
  type="submit"
  className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
>
  {isLoading
    ? "Creating..."
    : "Create Task"}
</button>
          </div>
        </form>
      </div>
    </div>
  );
}