import type { Board } from "../board.types";

import BoardCard from "./BoardCard";

interface Props {
  boards: Board[];
}

export default function BoardGrid({
  boards,
}: Props) {
  const list = Array.isArray(boards) ? boards : [];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {list.length === 0 ? (
        <p className="col-span-full text-center text-slate-500">
          No boards found.
        </p>
      ) : (
        list.map((board) => (
          <BoardCard
            key={board.id}
            board={board}
          />
        ))
      )}
    </div>
  );
}