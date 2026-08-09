export interface CreateLabelInput {
  name: string;

  color: string;

  project: string;

  createdBy: string;
}

export interface UpdateLabelInput {
  name?: string;

  color?: string;
}

export interface LabelQuery {
  page?: number;

  limit?: number;

  search?: string;
}