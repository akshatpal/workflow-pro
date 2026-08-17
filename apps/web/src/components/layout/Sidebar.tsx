import {
  FolderKanban,
  LayoutDashboard,
  Bell,
  MessageCircle,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },

  {
    title: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },

  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications",
  },

  {
    title: "Chat",
    icon: MessageCircle,
    path: "/chat",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white">
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold text-blue-600">
          Workflow Pro
        </h2>
      </div>

      <nav className="space-y-2 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />

              {menu.title}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}