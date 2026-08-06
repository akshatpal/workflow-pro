import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Column as BoardColumn } from "../board.types";

import ColumnHeader from "./ColumnHeader";
import TaskCard from "./TaskCard";

interface Props {
  column: BoardColumn;
}

export default function Column({
  column,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "COLUMN",
      column,
    },
  });

  const style = {
  transform:
    CSS.Transform.toString(
      transform
    ),

  transition,

  opacity: isDragging
    ? 0.5
    : 1,
};

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex h-fit min-h-[650px] w-80 shrink-0 flex-col rounded-xl bg-slate-100 p-4 transition-all"
    >
      <ColumnHeader
        title={column.name}
        count={(column.tasks ?? []).length}
      />

      <SortableContext
        id={column.id}
        items={(column.tasks ?? []).map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1">
          {(column.tasks ?? []).map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columnId={column.id}
            />
          ))}
        </div>
      </SortableContext>

      <button className="mt-4 rounded-lg border border-dashed py-3 transition hover:bg-slate-200">
        + Add Task
      </button>
    </div>
  );
}