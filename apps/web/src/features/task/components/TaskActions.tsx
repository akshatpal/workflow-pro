import {
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  onEdit: () => void;

  onDelete: () => void;
}

export default function TaskActions({
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onEdit}
        className="rounded-md border p-2 transition hover:bg-slate-100"
      >
        <Pencil size={16} />
      </button>

      <button
        onClick={onDelete}
        className="rounded-md border border-red-300 p-2 text-red-600 transition hover:bg-red-50"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}