import { useEffect } from "react";

import { useAppSelector } from "@/store/hooks";
import {
  connectSocket,
  disconnectSocket,
} from "@/lib/socket";

/**
 * Manages the socket lifecycle for the authenticated user.
 * - Connects and joins the user's room when userId is available.
 * - Disconnects when the user logs out.
 * Mount this once at the top of the authenticated tree.
 */
export function useSocket() {
  const user = useAppSelector(
    (state) => state.auth.user
  );
  const userId = user?._id || user?.id;

  useEffect(() => {
    if (!userId) {
      disconnectSocket();
      return;
    }

    connectSocket(userId);

    return () => {
      disconnectSocket();
    };
  }, [userId]);
}
