export interface Comment {
  id: string;

  message: string;

  task: string;

  user: {
    id: string;

    name: string;

    avatar?: string;
  };

  createdAt: string;

  updatedAt: string;
}

export interface CreateCommentRequest {
  task: string;

  message: string;
}

export interface UpdateCommentRequest {
  message: string;
}