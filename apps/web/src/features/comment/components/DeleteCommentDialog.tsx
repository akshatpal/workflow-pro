import {
  useDeleteCommentMutation,
} from "../commentApi";

interface Props {
  open: boolean;
  commentId: string;
  onClose: () => void;
}

export default function DeleteCommentDialog({
  open,
  commentId,
  onClose,
}: Props) {
  const [deleteComment] =
    useDeleteCommentMutation();

  if (!open) return null;

  const remove = async () => {
    await deleteComment(
      commentId
    ).unwrap();

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-8">
        <h2 className="text-xl font-bold">
          Delete Comment
        </h2>

        <p className="mt-4 text-slate-500">
          Are you sure?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={remove}
            className="rounded-lg bg-red-600 px-5 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}