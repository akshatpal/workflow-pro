import { Link } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { useGetNotificationsQuery } from "../notificationApi";

import EmptyNotification from "./EmptyNotification";
import NotificationItem from "./NotificationItem";

interface Props {
  onClose: () => void;
}

export default function NotificationDropdown({
  onClose,
}: Props) {
  const userId =
    useAppSelector(
      (state) => state.auth.user?._id
    ) ?? "";

  const { data } =
  useGetNotificationsQuery(
    { userId, page: 1, limit: 5 },
    { skip: !userId }
  );

  const notifications =
    data?.notifications ?? [];

  return (
    <div className="absolute right-0 top-12 z-50 w-[380px] overflow-hidden rounded-xl border bg-white shadow-xl">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold">
          Notifications
        </h2>

        <Link
          to="/notifications"
          onClick={onClose}
          className="text-sm text-blue-600"
        >
          View All
        </Link>
      </div>

      <div className="max-h-[450px] overflow-y-auto">
        {notifications.length ===
        0 ? (
          <EmptyNotification />
        ) : (
          notifications
            .slice(0, 5)
            .map(
              (
                notification
              ) => (
                <NotificationItem
                  key={
                    notification.id
                  }
                  notification={
                    notification
                  }
                />
              )
            )
        )}
      </div>
    </div>
  );
}