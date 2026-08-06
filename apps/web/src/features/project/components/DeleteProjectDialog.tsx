import {
  useDeleteProjectMutation,
} from "../projectApi";

import Button from "@/components/ui/Button";

import toast from "react-hot-toast";

interface Props {
  open: boolean;

  projectId: string;

  projectName: string;

  onClose: () => void;
}

export default function DeleteProjectDialog({
  open,
  projectId,
  projectName,
  onClose,
}: Props) {
  const [deleteProject, { isLoading }] =
    useDeleteProjectMutation();

  const handleDelete = async () => {
    try {
      await deleteProject(
        projectId
      ).unwrap();

      toast.success(
        "Project deleted successfully"
      );

      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message ??
          "Unable to delete project"
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-8">
        <h2 className="text-2xl font-bold">
          Delete Project
        </h2>

        <p className="mt-4 text-slate-600">
          Are you sure you want to
          delete{" "}
          <strong>
            {projectName}
          </strong>
          ?
        </p>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-3"
          >
            Cancel
          </button>

          <Button
            loading={isLoading}
            onClick={handleDelete}
            className="w-auto bg-red-600 px-6 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}