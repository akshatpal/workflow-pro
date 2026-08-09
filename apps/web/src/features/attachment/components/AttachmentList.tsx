import {
  Download,
  Trash2,
} from "lucide-react";

import {
  useDeleteAttachmentMutation,
  useGetAttachmentsQuery,
} from "../attachmentApi";

interface Props {
  taskId: string;
}

export default function AttachmentList({
  taskId,
}: Props) {
  const {
    data = [],
  } =
    useGetAttachmentsQuery(
      taskId
    );

  const [remove] =
    useDeleteAttachmentMutation();

  return (
    <div className="space-y-3">
      {data.map(
        (attachment) => (
          <div
            key={attachment.id}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div>
              <p className="font-medium">
                {
                  attachment.fileName
                }
              </p>

              <p className="text-xs text-slate-500">
                {(
                  attachment.fileSize /
                  1024
                ).toFixed(2)}
                {" "}KB
              </p>
            </div>

            <div className="flex gap-2">
              <a
                href={
                  attachment.fileUrl
                }
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border p-2"
              >
                <Download
                  size={16}
                />
              </a>

              <button
                onClick={() =>
                  remove(
                    attachment.id
                  )
                }
                className="rounded-lg border border-red-300 p-2 text-red-600"
              >
                <Trash2
                  size={16}
                />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}