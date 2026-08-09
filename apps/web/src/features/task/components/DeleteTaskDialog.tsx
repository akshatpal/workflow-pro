import {
    useDeleteTaskMutation,
} from "../taskApi";

interface Props {
    open: boolean;

    taskId: string;

    onClose: () => void;
}

export default function DeleteTaskDialog({
    open,
    taskId,
    onClose,
}: Props) {
    const [
        deleteTask,
        {
            isLoading,
        },
    ] = useDeleteTaskMutation();

    if (!open) return null;

    const handleDelete =
        async () => {
            await deleteTask(
                taskId
            ).unwrap();

            onClose();
        };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-xl bg-white p-8">
                <h2 className="text-xl font-bold">
                    Delete Task
                </h2>

                <p className="mt-4 text-slate-600">
                    Are you sure you want
                    to delete this task?
                </p>

                <div className="mt-8 flex justify-end gap-4">
                    <button
                        onClick={
                            onClose
                        }
                        className="rounded-lg border px-5 py-3"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={isLoading}
                        onClick={handleDelete}
                        className="rounded-lg bg-red-600 px-5 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading
                            ? "Deleting..."
                            : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}