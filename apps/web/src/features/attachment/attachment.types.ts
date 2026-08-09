export interface Attachment {
  id: string;

  fileName: string;

  fileUrl: string;

  fileSize: number;

  mimeType: string;

  task: string;

  uploadedBy: {
    id: string;

    name: string;
  };

  createdAt: string;
}