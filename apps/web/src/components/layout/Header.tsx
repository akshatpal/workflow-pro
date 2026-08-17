import {
  LogOut,
  Bell,
  Search,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useLogoutMutation,
} from "@/features/auth/authApi";

import {
  logout,
} from "@/features/auth/authSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import NotificationBell from "@/features/notification/components/NotificationBell";

export default function Header() {
  const navigate =
    useNavigate();

  const dispatch =
    useAppDispatch();

  const user =
    useAppSelector(
      (state) => state.auth.user
    );

  const [logoutApi] =
    useLogoutMutation();

  const handleLogout =
    async () => {
      try {
        await logoutApi().unwrap();
      } catch {}

      dispatch(logout());

      navigate("/login");
    };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          placeholder="Search..."
          className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <NotificationBell />

        <div className="text-right">
          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-slate-500">
            {user?.role}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg p-2 transition hover:bg-slate-100"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}