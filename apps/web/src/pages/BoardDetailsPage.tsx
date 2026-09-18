import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import ErrorState from "@/components/common/ErrorState";

import {
  useGetBoardByIdQuery,
} from "@/features/board/boardApi";

import KanbanBoard from "@/features/board/components/KanbanBoard";
import CreateTaskModal from "@/features/task/components/CreateTaskModal";

export default function BoardDetailsPage() {
  const { id } = useParams();
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
  } = useGetBoardByIdQuery(id!);

  if (isLoading) {
    return (
      <div className="animate-pulse h-[650px] rounded-xl bg-slate-200" />
    );
  }

  if (isError || !data) {
    return (
      <ErrorState message="Unable to load board." />
    );
  }

  const columns = data.data.columns || [];
  const todoColumn =
    columns.find((col) => {
      const lower = col.name.toLowerCase().replace(/[\s-_]/g, "");
      return lower === "todo" || lower.includes("todo");
    }) || columns[0];

  return (
    <div className="space-y-8">
      <PageHeader
        title={data.data.name}
        subtitle={data.data.description}
        action={
          todoColumn ? (
            <button
              onClick={() => setIsCreateTaskOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm hover:bg-blue-700 transition"
            >
              <Plus size={18} />
              Add Task
            </button>
          ) : null
        }
      />

      {todoColumn && (
        <CreateTaskModal
          open={isCreateTaskOpen}
          columnId={todoColumn.id}
          onClose={() => setIsCreateTaskOpen(false)}
        />
      )}

      <KanbanBoard
        boardId={data.data.id}
        columns={data.data.columns}
      />
    </div>
  );
}