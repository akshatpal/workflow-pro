import { useAppSelector } from "../../store/hooks";

export default function Header() {
  const user = useAppSelector(
    (state) => state.auth.user
  );

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium">
            {user?.name}
          </p>

          <p className="text-sm text-slate-500">
            {user?.role}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
          {user?.name?.charAt(0)}
        </div>
      </div>
    </header>
  );
}