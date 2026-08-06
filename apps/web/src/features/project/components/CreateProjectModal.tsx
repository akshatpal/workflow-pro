import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  useCreateProjectMutation,
} from "../projectApi";

import {
  projectSchema,
  type ProjectFormValues,
} from "../projectSchema";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface Props {
  open: boolean;

  onClose: () => void;
}

export default function CreateProjectModal({
  open,
  onClose,
}: Props) {
  const [createProject, { isLoading }] =
    useCreateProjectMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver:
      zodResolver(projectSchema),

    defaultValues: {
      visibility: "PRIVATE",
    },
  });

  const onSubmit = async (
    values: ProjectFormValues
  ) => {
    try {
      await createProject(
        values as any
      ).unwrap();

      toast.success(
        "Project created successfully"
      );

      reset();

      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message ??
          "Unable to create project"
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">
          Create Project
        </h2>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-5"
        >
          <Input
            label="Project Name"
            placeholder="Workflow Pro"
            error={
              errors.name?.message
            }
            {...register("name")}
          />

          <Input
            label="Project Key"
            placeholder="WFP"
            error={
              errors.key?.message
            }
            {...register("key")}
          />

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows={4}
              {...register(
                "description"
              )}
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Visibility
            </label>

            <select
              {...register(
                "visibility"
              )}
              className="w-full rounded-lg border border-slate-300 p-3"
            >
              <option value="PRIVATE">
                Private
              </option>

              <option value="PUBLIC">
                Public
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-3"
            >
              Cancel
            </button>

            <Button
              type="submit"
              loading={isLoading}
              className="w-auto px-6"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}