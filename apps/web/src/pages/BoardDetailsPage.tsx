import { useParams } from "react-router-dom";

import PageHeader from "@/components/common/PageHeader";
import ErrorState from "@/components/common/ErrorState";

import {
  useGetBoardByIdQuery,
} from "@/features/board/boardApi";

import KanbanBoard from "@/features/board/components/KanbanBoard";

export default function BoardDetailsPage() {
  const { id } = useParams();

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

  return (
    <div className="space-y-8">
      <PageHeader
        title={data.data.name}
        subtitle={data.data.description}
      />

      <KanbanBoard
        boardId={data.data.id}
        columns={data.data.columns}
      />
    </div>
  );
}