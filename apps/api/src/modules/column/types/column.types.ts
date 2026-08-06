export interface CreateColumnInput {
  name: string;
  board: string;
  color?: string;
}

export interface UpdateColumnInput {
  name?: string;
  color?: string;
  position?: number;
  wipLimit?: number;
  isCollapsed?: boolean;
}

export interface ColumnQuery {
  board: string;
}

export interface ReorderColumnInput {
  boardId: string;

  columns: {
    id: string;

    position: number;
  }[];
}