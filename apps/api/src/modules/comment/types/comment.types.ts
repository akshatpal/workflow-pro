export interface CreateCommentInput {
  task: string;
  author: string;
  message: string;
}

export interface UpdateCommentInput {
  message: string;
}