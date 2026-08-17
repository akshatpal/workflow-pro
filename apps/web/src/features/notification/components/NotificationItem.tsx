import {
  useDeleteNotificationMutation,
  useMarkAsReadMutation,
} from "../notificationApi";

import type {
  Notification,
} from "../notification.types";

import {
  Bell,
  Check,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

interface Props {
  notification: Notification;
}

export default function NotificationItem({
  notification,
}: Props) {
  const navigate =
    useNavigate();

  const [
    markAsRead,
    {
      isLoading:
        isMarkingRead,
    },
  ] =
    useMarkAsReadMutation();

  const [
    deleteNotification,
    {
      isLoading:
        isDeleting,
    },
  ] =
    useDeleteNotificationMutation();

  const handleRead = async () => {
    if (!notification.isRead) {
      await markAsRead(
        notification.id
      ).unwrap();
    }

    if (
      notification.referenceId
    ) {
      navigate(
        getNotificationPath(
          notification
        )
      );
    }
  };

  const handleDelete = async (
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    await deleteNotification(
      notification.id
    ).unwrap();
  };

  const handleMarkAsRead = async (
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    if (notification.isRead)
      return;

    await markAsRead(
      notification.id
    ).unwrap();
  };

  return (
    <div
      onClick={handleRead}
      className={`group flex cursor-pointer gap-4 rounded-xl border p-5 transition hover:shadow-sm ${
        !notification.isRead
          ? "border-blue-200 bg-blue-50/50"
          : "bg-white"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          !notification.isRead
            ? "bg-blue-100 text-blue-600"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        <Bell size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold">
              {notification.title}
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              {notification.message}
            </p>
          </div>

          {!notification.isRead && (
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
          )}
        </div>

        <p className="mt-3 text-xs text-slate-400">
          {new Date(
            notification.createdAt
          ).toLocaleString()}
        </p>
      </div>

      <div
        className="flex shrink-0 items-start gap-1 opacity-0 transition group-hover:opacity-100"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {!notification.isRead && (
          <button
            disabled={
              isMarkingRead
            }
            onClick={
              handleMarkAsRead
            }
            title="Mark as read"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 disabled:opacity-50"
          >
            <Check size={16} />
          </button>
        )}

        <button
          disabled={isDeleting}
          onClick={
            handleDelete
          }
          title="Delete"
          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

function getNotificationPath(
  notification: Notification
) {
  switch (notification.type) {
    case "TASK_ASSIGNED":
    case "TASK_UPDATED":
    case "TASK_COMMENTED":
      return `/tasks/${notification.referenceId}`;

    case "PROJECT_INVITE":
      return `/projects/${notification.referenceId}`;

    case "BOARD_CREATED":
      return `/boards/${notification.referenceId}`;

    default:
      return "/notifications";
  }
}