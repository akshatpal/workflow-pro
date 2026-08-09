import {
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function CommentActions({
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="rounded-md p-2 hover:bg-slate-100"
      >
        <Pencil size={16} />
      </button>

      <button
        onClick={onDelete}
        className="rounded-md p-2 text-red-600 hover:bg-red-50"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}