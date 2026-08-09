import type { UseFormRegister } from "react-hook-form";

import {
  useGetUsersQuery,
} from "../taskApi";

import type {
    TaskFormValues,
} from "../taskSchema";

interface Props {
  register: UseFormRegister<TaskFormValues>;
}

export default function TaskForm({
  register,
}: Props) {
  const { data: users = [] } =
    useGetUsersQuery();

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block">
          Title
        </label>

        <input
          {...register("title")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block">
          Description
        </label>

        <textarea
          rows={5}
          {...register("description")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block">
            Priority
          </label>

          <select
            {...register("priority")}
            className="w-full rounded-lg border p-3"
          >
            <option value="LOW">
              Low
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="HIGH">
              High
            </option>

            <option value="CRITICAL">
              Critical
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block">
            Assignee
          </label>

          <select
            {...register("assignee")}
            className="w-full rounded-lg border p-3"
          >
            <option value="">
              Unassigned
            </option>

            {users.map(
              (user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block">
          Due Date
        </label>

        <input
          type="date"
          {...register("dueDate")}
          className="w-full rounded-lg border p-3"
        />
      </div>
    </div>
  );
}