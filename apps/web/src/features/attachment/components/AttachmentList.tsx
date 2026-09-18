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
    isLoading,
  } =
    useGetAttachmentsQuery(
      taskId
    );

  const [remove] =
    useDeleteAttachmentMutation();

  const attachments = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <p className="text-sm text-slate-500">
        Loading attachments...
      </p>
    );
  }

  if (attachments.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-slate-500">
        No attachments yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {attachments.map(
        (attachment) => {
          const displayName =
            attachment.originalName ||
            attachment.fileName;
          const fileSizeInBytes =
            attachment.size ??
            attachment.fileSize ??
            0;
          const downloadUrl =
            attachment.fileUrl ||
            `${import.meta.env.VITE_API_URL}/attachments/${attachment.id}/download`;

          return (
            <div
              key={attachment.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-medium">
                  {displayName}
                </p>

                <p className="text-xs text-slate-500">
                  {(
                    fileSizeInBytes /
                    1024
                  ).toFixed(2)}{" "}
                  KB
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border p-2 hover:bg-slate-50 text-slate-700"
                  title="Download"
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
                  className="rounded-lg border border-red-300 p-2 text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2
                    size={16}
                  />
                </button>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}