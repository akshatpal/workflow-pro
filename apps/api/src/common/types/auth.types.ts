import { UserRole } from "../../modules/user/model/user.model.js";

export interface CurrentUser {
  userId: string;
  role: UserRole;
}

export interface JwtPayload {
  userId: string;
  role: UserRole;
}