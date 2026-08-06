import { useState } from "react";

import { useParams } from "react-router-dom";

import PageHeader from "@/components/common/PageHeader";

import {
  useGetBoardsQuery,
} from "@/features/board/boardApi";

import BoardGrid from "@/features/board/components/BoardGrid";

import CreateBoardModal from "@/features/board/components/CreateBoardModal";

export default function BoardsPage() {
  const { projectId } =
    useParams();

  const [open, setOpen] =
    useState(false);

  const {
    data,
    isLoading,
  } = useGetBoardsQuery(
    projectId!
  );

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <>
      <CreateBoardModal
        open={open}
        projectId={
          projectId!
        }
        onClose={() =>
          setOpen(false)
        }
      />

      <div className="space-y-8">
        <PageHeader
          title="Boards"
          subtitle="Manage project boards"
          action={
            <button
              onClick={() =>
                setOpen(true)
              }
              className="rounded-lg bg-blue-600 px-5 py-3 text-white"
            >
              Create Board
            </button>
          }
        />

        <BoardGrid
          boards={
            data?.data.boards ??
            []
          }
        />
      </div>
    </>
  );
}