import { useState } from "react";

import { Bell } from "lucide-react";

import { useAppSelector } from "@/store/hooks";
import {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
} from "../notificationApi";

import NotificationBadge from "./NotificationBadge";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const userId =
    useAppSelector(
      (state) => state.auth.user?._id
    ) ?? "";

  const { refetch } = useGetNotificationsQuery(
    { userId, page: 1, limit: 5 },
    { skip: !userId }
  );

  const { data: unreadData } = useGetUnreadCountQuery(userId, {
    skip: !userId,
  });

  const unreadCount = unreadData?.unread ?? 0;

  const handleBellClick = () => {
    if (userId) {
      refetch();
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={handleBellClick}
        className="relative rounded-lg p-2 transition hover:bg-slate-100"
      >
        <Bell size={22} />

        <NotificationBadge count={unreadCount} />
      </button>

      {open && (
        <NotificationDropdown
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}