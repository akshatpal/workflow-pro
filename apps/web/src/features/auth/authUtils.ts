import type { User } from "./auth.types";

export function getAuthUserId(
  user?: User | null,
  accessToken?: string | null
): string {
  if (user) {
    const id = (user as any)._id || user.id || (user as any).userId;
    if (id) return String(id);
  }

  if (accessToken) {
    try {
      const parts = accessToken.split(".");
      if (parts.length >= 2) {
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const payload = JSON.parse(jsonPayload);
        const tokenUserId = payload.userId || payload.id || payload._id;
        if (tokenUserId) return String(tokenUserId);
      }
    } catch {}
  }

  return "";
}

export function getAuthUserRole(
  user?: User | null,
  accessToken?: string | null
): string {
  if (user && user.role) {
    return String(user.role);
  }

  if (accessToken) {
    try {
      const parts = accessToken.split(".");
      if (parts.length >= 2) {
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const payload = JSON.parse(jsonPayload);
        if (payload.role) return String(payload.role);
      }
    } catch {}
  }

  return "";
}

