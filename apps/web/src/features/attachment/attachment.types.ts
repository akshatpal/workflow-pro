export interface Attachment {
  id: string;

  fileName: string;

  originalName?: string;

  fileUrl?: string;

  fileSize?: number;

  size?: number;

  mimeType: string;

  task: string;

  uploadedBy:
    | {
        id: string;

        name: string;
      }
    | string;

  createdAt: string;
}