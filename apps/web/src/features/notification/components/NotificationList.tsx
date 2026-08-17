import { useState } from "react";

import {
  useGetNotificationsQuery,
  useMarkAllReadMutation,
} from "../notificationApi";

import { useAppSelector } from "@/store/hooks";

import NotificationItem from "./NotificationItem";
import EmptyNotification from "./EmptyNotification";

export default function NotificationList() {
  const [page, setPage] = useState(1);

  const limit = 5;

  const userId =
    useAppSelector(
      (state) => state.auth.user?._id
    ) ?? "";

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } =
    useGetNotificationsQuery(
      { userId, page, limit },
      { skip: !userId }
    );

  const [
    markAllRead,
    {
      isLoading:
        isMarkingAllRead,
    },
  ] =
    useMarkAllReadMutation();


  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border p-5"
          >
            <div className="h-5 w-1/3 rounded bg-slate-200" />

            <div className="mt-3 h-4 w-2/3 rounded bg-slate-200" />

            <div className="mt-3 h-3 w-1/4 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        Failed to load notifications.
      </div>
    );
  }

  const notifications =
    data?.notifications ?? [];

  const pagination =
    data?.pagination;

  if (
    notifications.length === 0 &&
    page === 1
  ) {
    return (
      <EmptyNotification />
    );
  }

  const hasPreviousPage =
    page > 1;

  const hasNextPage =
    pagination
      ? page <
        pagination.totalPages
      : false;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {pagination?.total ?? 0}{" "}
          notifications
        </p>

        <button
          disabled={
            isMarkingAllRead
          }
          onClick={() =>
            markAllRead(userId).unwrap()
          }
          className="text-sm font-medium text-blue-600 hover:underline disabled:opacity-50"
        >
          {isMarkingAllRead
            ? "Marking..."
            : "Mark all as read"}
        </button>
      </div>

      <div
        className={`space-y-3 transition-opacity ${
          isFetching
            ? "opacity-60"
            : "opacity-100"
        }`}
      >
        {notifications.map(
          (notification) => (
            <NotificationItem
              key={
                notification.id
              }
              notification={
                notification
              }
            />
          )
        )}
      </div>

      <div className="mt-8 flex items-center justify-between border-t pt-5">
        <button
          disabled={
            !hasPreviousPage ||
            isFetching
          }
          onClick={() =>
            setPage(
              (current) =>
                current - 1
            )
          }
          className="rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm text-slate-500">
          Page {page} of{" "}
          {pagination
            ?.totalPages ?? 1}
        </span>

        <button
          disabled={
            !hasNextPage ||
            isFetching
          }
          onClick={() =>
            setPage(
              (current) =>
                current + 1
            )
          }
          className="rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}