export interface BoardListResponse {
  success: boolean;

  message: string;

  data: Board[];
}

export interface CreateBoardRequest {
  name: string;

  description?: string;

  project: string;
}

export interface UpdateBoardRequest {
  name?: string;

  description?: string;
}

export interface TaskCard {
  id: string;

  title: string;

  priority: string;

  status: string;

  position: number;

  assignee?: {
    id: string;

    name: string;

    avatar?: string;
  };
}

export interface Column {
  id: string;

  name: string;

  position: number;

  tasks?: TaskCard[];
}

export interface Board {
  id: string;

  name: string;

  description: string;

  type: string;

  project: string;

  columns: Column[];
}

export interface BoardResponse {
  success: boolean;

  message: string;

  data: Board;
}