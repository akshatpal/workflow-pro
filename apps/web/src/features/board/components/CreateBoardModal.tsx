import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import {
  boardSchema,
  type BoardFormValues,
} from "../boardSchema";

import {
  useCreateBoardMutation,
} from "../boardApi";

interface Props {
  open: boolean;

  projectId: string;

  onClose: () => void;
}

export default function CreateBoardModal({
  open,
  projectId,
  onClose,
}: Props) {
  const [createBoard, { isLoading }] =
    useCreateBoardMutation();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<BoardFormValues>({
    resolver:
      zodResolver(boardSchema),

    defaultValues: {
      type: "KANBAN",
    },
  });

  const onSubmit = async (
    values: BoardFormValues
  ) => {
    try {
      await createBoard({
        ...values,
        project: projectId,
      }).unwrap();

      toast.success(
        "Board created"
      );

      reset();

      onClose();
    } catch {
      toast.error(
        "Unable to create board"
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-8">
        <h2 className="mb-6 text-2xl font-bold">
          Create Board
        </h2>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-5"
        >
          <Input
            label="Board Name"
            {...register("name")}
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

          <select
            {...register("type")}
            className="w-full rounded-lg border p-3"
          >
            <option value="KANBAN">
              Kanban
            </option>

            <option value="SCRUM">
              Scrum
            </option>
          </select>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-3"
            >
              Cancel
            </button>

            <Button
              loading={isLoading}
              type="submit"
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