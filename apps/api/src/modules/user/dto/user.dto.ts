import { UserDocument } from "../model/user.model.js";

export class UserDto {
  static toResponse(user: UserDocument) {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      designation: user.designation,
      department: user.department,
      role: user.role,
      manager: user.manager,
      profilePic: user.profilePic,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toResponseArray(users: UserDocument[]) {
    return users.map((user) => this.toResponse(user));
  }
}