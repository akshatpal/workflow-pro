import {
    useState,
} from "react";
import { useAppSelector } from "@/store/hooks";
import { getAuthUserId } from "@/features/auth/authUtils";

import {
    useCreateCommentMutation,
} from "../commentApi";

interface Props {
    taskId: string;
}

export default function CommentForm({
    taskId,
}: Props) {
    const [message, setMessage] =
        useState("");

    const { user, accessToken } = useAppSelector(
        (state) => state.auth
    );

    const currentUserId =
        getAuthUserId(user, accessToken) ||
        user?._id ||
        user?.id;

    const [
        createComment,
        {
            isLoading,
        },
    ] = useCreateCommentMutation();

    const submit =
        async () => {
            if (!message.trim() || !currentUserId)
                return;

            await createComment({
                task: taskId,
                author: currentUserId,
                message: message.trim(),
            }).unwrap();

            setMessage("");
        };

    return (
        <div className="space-y-3">
            <textarea
                rows={4}
                value={message}
                onChange={(e) =>
                    setMessage(
                        e.target.value
                    )
                }
                placeholder="Write a comment..."
                className="w-full rounded-lg border p-3"
            />

            <button
                disabled={isLoading || !message.trim()}
                onClick={submit}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isLoading
                    ? "Posting..."
                    : "Add Comment"}
            </button>
        </div>
    );
}