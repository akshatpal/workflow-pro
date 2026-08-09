import {
    useEffect,
} from "react";

import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    taskSchema,
    type TaskFormValues,
} from "../taskSchema";

import {
    useUpdateTaskMutation,
} from "../taskApi";

import TaskForm from "./TaskForm";

import type {
    Task,
} from "../task.types";

interface Props {
    open: boolean;

    task: Task | null;

    onClose: () => void;
}

export default function EditTaskModal({
    open,
    task,
    onClose,
}: Props) {
    const [
        updateTask,
        { isLoading },
    ] = useUpdateTaskMutation();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<TaskFormValues>({
        resolver:
            zodResolver(taskSchema),
    });

    useEffect(() => {
        if (!task) return;

        reset({
            title: task.title,

            description:
                task.description,

            priority:
                task.priority,

            assignee:
                task.assignee?.id,

            dueDate:
                task.dueDate,

            labels:
                task.labels.map(
                    (label) =>
                        label.id
                ),
        });
    }, [task, reset]);

    const onSubmit = async (
        values: TaskFormValues
    ) => {
        if (!task) return;

        await updateTask({
            id: task.id,

            body: values,
        }).unwrap();

        onClose();
    };

    if (!open || !task)
        return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-xl rounded-xl bg-white p-8">
                <h2 className="mb-6 text-2xl font-bold">
                    Edit Task
                </h2>

                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className="space-y-6"
                >
                    <TaskForm
                        register={
                            register
                        }
                    />

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={
                                onClose
                            }
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
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}