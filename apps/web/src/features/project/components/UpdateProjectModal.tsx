import {
  useEffect,
} from "react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import {
  projectSchema,
  type ProjectFormValues,
} from "../projectSchema";

import type {
    Project,
} from "../project.types";

import {
  useUpdateProjectMutation,
} from "../projectApi";

interface Props {
  open: boolean;

  project: Project | null;

  onClose: () => void;
}

export default function UpdateProjectModal({
  open,
  project,
  onClose,
}: Props) {
  const [updateProject, { isLoading }] =
    useUpdateProjectMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } =
    useForm<ProjectFormValues>({
      resolver:
        zodResolver(
          projectSchema
        ),
    });

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        key: project.key,
        description:
          project.description,
        visibility:
          project.visibility as
            | "PRIVATE"
            | "PUBLIC",
      });
    }
  }, [project, reset]);

  const onSubmit = async (
    values: ProjectFormValues
  ) => {
    if (!project) return;

    try {
      await updateProject({
        id: project.id,
        body: values,
      }).unwrap();

      toast.success(
        "Project updated successfully"
      );

      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message ??
          "Unable to update project"
      );
    }
  };

  if (!open || !project)
    return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-8">
        <h2 className="mb-6 text-2xl font-bold">
          Update Project
        </h2>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-5"
        >
          <Input
            label="Project Name"
            error={
              errors.name?.message
            }
            {...register("name")}
          />

          <Input
            label="Project Key"
            error={
              errors.key?.message
            }
            {...register("key")}
          />

          <div>
            <label className="mb-2 block">
              Description
            </label>

            <textarea
              rows={4}
              {...register(
                "description"
              )}
              className="w-full rounded-lg border p-3"
            />
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
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}