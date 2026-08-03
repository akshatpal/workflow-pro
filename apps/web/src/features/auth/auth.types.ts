export interface LoginRequest {
  email: string;

  password: string;
}

export interface User {
  id: string;

  name: string;

  email: string;

  designation: string;

  role: string;

  profilePic: string | null;
}

export interface LoginResponse {
  success: boolean;

  message: string;

  data: {
    accessToken: string;

    user: User;
  };
}

export interface MeResponse {
  success: boolean;

  message: string;

  data: User;
}