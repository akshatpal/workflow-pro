import type {
    ChangeEvent,
} from "react";
import { useAppSelector } from "@/store/hooks";
import { getAuthUserId } from "@/features/auth/authUtils";

import {
  useUploadAttachmentMutation,
} from "../attachmentApi";

interface Props {
  taskId: string;
}

export default function AttachmentUpload({
  taskId,
}: Props) {
  const { user, accessToken } = useAppSelector(
    (state) => state.auth
  );

  const currentUserId =
    getAuthUserId(user, accessToken) ||
    user?._id ||
    user?.id;

  const [upload, { isLoading }] =
    useUploadAttachmentMutation();

  const uploadFile = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file || !currentUserId) return;

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "task",
      taskId
    );

    formData.append(
      "uploadedBy",
      currentUserId
    );

    try {
      await upload(
        formData
      ).unwrap();

      event.target.value = "";
    } catch (error) {
      console.error("Failed to upload attachment:", error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="file"
        disabled={isLoading}
        onChange={uploadFile}
        className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
      />
      {isLoading && (
        <span className="text-sm text-slate-500 whitespace-nowrap">
          Uploading...
        </span>
      )}
    </div>
  );
}