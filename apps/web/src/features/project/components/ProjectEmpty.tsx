import { FolderOpen } from "lucide-react";

export default function ProjectEmpty() {
  return (
    <div className="rounded-xl bg-white py-24 text-center shadow">
      <FolderOpen
        size={80}
        className="mx-auto text-slate-300"
      />

      <h2 className="mt-6 text-2xl font-semibold">
        No Projects Found
      </h2>

      <p className="mt-2 text-slate-500">
        Create your first project to get
        started.
      </p>
    </div>
  );
}