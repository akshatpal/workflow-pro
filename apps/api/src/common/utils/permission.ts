import { UserRole } from "../../modules/user/model/user.model.js";

export const isAdmin = (role: UserRole) => {
  return role === UserRole.ADMIN;
};

export const isProjectManager = (role: UserRole) => {
  return role === UserRole.PROJECT_MANAGER;
};

export const isEmployee = (role: UserRole) => {
  return role === UserRole.EMPLOYEE;
};