import {
  useGetCommentsQuery,
} from "../commentApi";

import CommentItem from "./CommentItem";

import CommentForm from "./CommentForm";

interface Props {
  taskId: string;
}

export default function CommentList({
  taskId,
}: Props) {
  const {
    data = [],
    isLoading,
  } =
    useGetCommentsQuery(
      taskId
    );

  if (isLoading) {
    return (
      <p>
        Loading comments...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <CommentForm
        taskId={taskId}
      />

      {data.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-slate-500">
          No comments yet.
        </div>
      ) : (
        data.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
          />
        ))
      )}
    </div>
  );
}