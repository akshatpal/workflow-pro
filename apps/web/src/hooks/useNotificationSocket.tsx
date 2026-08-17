import { useEffect } from "react";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Bell } from "lucide-react";

import { getSocket } from "@/lib/socket";
import { api } from "@/store/api";
import type { Notification } from "@/features/notification/notification.types";

/**
 * Listens for real-time `notification:new` events from the server.
 * On each event:
 *  1. Shows a toast with the notification title + message.
 *  2. Invalidates the "Notification" RTK Query tag so the bell
 *     count and lists auto-refetch.
 *
 * Mount this once inside the authenticated layout.
 */
export function useNotificationSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = getSocket();

    const handleNewNotification = (
      notification: Notification
    ) => {
      // Invalidate RTK Query cache → triggers automatic refetch
      // of getNotifications and getUnreadCount
      dispatch(
        api.util.invalidateTags(["Notification"])
      );

      // Show a styled toast pop-up
      toast(
        (t) => (
          <div
            className="flex items-start gap-3"
            onClick={() => toast.dismiss(t.id)}
          >
            <div className="mt-0.5 rounded-full bg-blue-100 p-1.5 text-blue-600">
              <Bell size={14} />
            </div>

            <div>
              <p className="text-sm font-semibold">
                {notification.title}
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                {notification.message}
              </p>
            </div>
          </div>
        ),
        {
          duration: 5000,
          position: "top-right",
        }
      );
    };

    socket.on("notification:new", handleNewNotification);

    return () => {
      socket.off("notification:new", handleNewNotification);
    };
  }, [dispatch]);
}
