import type { Project } from "../project.types";

interface MemberUser {
    _id: string;
    name: string;
    email: string;
    profilePic: string;
    designation: string;
}

interface Props {
    project: Project;
}

export default function ProjectMembers({
    project,
}: Props) {
    // The API wraps the project inside a `data` key.
    // RTK Query may return the full response object, so we unwrap it here.
    const projectData = (project as any)?.data ?? project;
    const members: Array<{ user: MemberUser; role: string; joinedAt?: string }> =
        projectData?.members ?? [];

    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-6 text-xl font-semibold">
                Members
            </h2>

            <div className="space-y-4">
                {members.map((member, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-4"
                    >
                        <div>
                            <p className="font-medium">
                                {member.user?.name ?? "Unknown"}
                            </p>

                            <p className="text-sm text-slate-400">
                                {member.user?.email}
                            </p>

                            <p className="text-xs font-semibold uppercase text-slate-500">
                                {member.role}
                            </p>
                        </div>
                    </div>
                ))}

                {members.length === 0 && (
                    <p className="text-center text-slate-500">
                        No members found.
                    </p>
                )}
            </div>
        </div>
    );
}