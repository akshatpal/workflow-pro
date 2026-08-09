import { useEffect, useState } from "react";

import {
  useUpdateCommentMutation,
} from "../commentApi";

import type {
  Comment,
} from "../comment.types";

interface Props {
  open: boolean;
  comment: Comment | null;
  onClose: () => void;
}

export default function EditCommentModal({
  open,
  comment,
  onClose,
}: Props) {
  const [message, setMessage] =
    useState("");

  const [updateComment] =
    useUpdateCommentMutation();

  useEffect(() => {
    if (comment) {
      setMessage(
        comment.message
      );
    }
  }, [comment]);

  if (!open || !comment)
    return null;

  const save = async () => {
    await updateComment({
      id: comment.id,
      body: {
        message,
      },
    }).unwrap();

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-8">
        <h2 className="mb-5 text-xl font-bold">
          Edit Comment
        </h2>

        <textarea
          rows={5}
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={save}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}