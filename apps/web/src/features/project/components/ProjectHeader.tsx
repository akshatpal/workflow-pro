import type { Project } from "../project.types";
import { Link } from "react-router-dom";

interface Props {
    project: Project;
}

export default function ProjectHeader({
    project,
}: Props) {
    // Unwrap API envelope { success, message, data: {...} } if present
    const p: Project = (project as any)?.data ?? project;

    return (
        <div className="rounded-xl bg-white p-8 shadow">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">
                        {p.name}
                    </h1>

                    <p className="mt-2 text-slate-500">
                        {p.key}
                    </p>
                </div>

                <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${p.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                >
                    {p.status}
                </span>
            </div>

            <p className="mt-8 text-slate-600">
                {p.description || "No description available"}
            </p>
            <div className="mt-8">
                <Link
                    to={`/projects/${p.id}/boards`}
                    className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                >
                    Open Boards
                </Link>
            </div>
        </div>
    );
}