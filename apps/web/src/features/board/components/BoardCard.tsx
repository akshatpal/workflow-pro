import { LayoutPanelTop } from "lucide-react";

import { Link } from "react-router-dom";

import type { Board } from "../board.types";

interface Props {
  board: Board;
}

export default function BoardCard({
  board,
}: Props) {
  return (
    <Link
      to={`/boards/${board.id}`}
      className="rounded-xl border bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {board.name}
        </h2>

        <LayoutPanelTop
          className="text-blue-600"
          size={26}
        />
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {board.description ||
          "No description"}
      </p>
    </Link>
  );
}