export interface Comment {
  id: string;

  message: string;

  task: string;

  author?:
    | {
        id?: string;
        _id?: string;
        name: string;
        email?: string;
        profilePic?: string;
      }
    | string;

  user?: {
    id: string;

    name: string;

    avatar?: string;
  };

  edited?: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface CreateCommentRequest {
  task: string;

  author: string;

  message: string;
}

export interface UpdateCommentRequest {
  message: string;
}