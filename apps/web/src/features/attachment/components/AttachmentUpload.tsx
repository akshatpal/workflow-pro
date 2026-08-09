import type {
    ChangeEvent,
} from "react";

import {
  useUploadAttachmentMutation,
} from "../attachmentApi";

interface Props {
  taskId: string;
}

export default function AttachmentUpload({
  taskId,
}: Props) {
  const [upload] =
    useUploadAttachmentMutation();

  const uploadFile = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

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

    await upload(
      formData
    ).unwrap();

    event.target.value = "";
  };

  return (
    <input
      type="file"
      onChange={uploadFile}
      className="block w-full"
    />
  );
}