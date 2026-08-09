import { useState } from "react";

import type {
  Comment,
} from "../comment.types";

import CommentActions from "./CommentActions";
import EditCommentModal from "./EditCommentModal";
import DeleteCommentDialog from "./DeleteCommentDialog";

interface Props {
  comment: Comment;
}

export default function CommentItem({
  comment,
}: Props) {
  const [editOpen, setEditOpen] =
    useState(false);

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false);

  return (
    <>
      <EditCommentModal
        open={editOpen}
        comment={comment}
        onClose={() =>
          setEditOpen(false)
        }
      />

      <DeleteCommentDialog
        open={deleteOpen}
        commentId={comment.id}
        onClose={() =>
          setDeleteOpen(false)
        }
      />

      <div className="rounded-lg border p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {comment.user.name.charAt(
                0
              )}
            </div>

            <div>
              <p className="font-medium">
                {comment.user.name}
              </p>

              <p className="text-xs text-slate-500">
                {new Date(
                  comment.createdAt
                ).toLocaleString()}
              </p>
            </div>
          </div>

          <CommentActions
            onEdit={() =>
              setEditOpen(true)
            }
            onDelete={() =>
              setDeleteOpen(true)
            }
          />
        </div>

        <p className="mt-4 whitespace-pre-wrap text-slate-700">
          {comment.message}
        </p>
      </div>
    </>
  );
}