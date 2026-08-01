import { UserModel } from "../model/user.model.js";
import { UserDto } from "../dto/user.dto.js";
import {
  UpdateUserInput,
  UserQuery,
} from "../types/user.types.js";

import { NotFoundError } from "../../../common/errors/NotFoundError.js";
import { UserRole } from "../model/user.model.js";

export class UserService {
  static async getUsers(query: UserQuery) {
    const {
      page = 1,
      limit = 10,
      search,
      role,
      sortBy = "createdAt",
      order = "desc",
    } = query;

    const filter: any = {
      isActive: true,
    };

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (role) {
      filter.role = role;
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      UserModel.find(filter)
        .sort({
          [sortBy]: order === "asc" ? 1 : -1,
        })
        .skip(skip)
        .limit(limit),

      UserModel.countDocuments(filter),
    ]);

    return {
      users: UserDto.toResponseArray(users),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getUserById(id: string) {
    const user = await UserModel.findById(id);

    if (!user || !user.isActive) {
      throw new NotFoundError("User not found");
    }

    return UserDto.toResponse(user);
  }

  static async updateUser(
    id: string,
    payload: UpdateUserInput
  ) {
    const user = await UserModel.findById(id);

    if (!user || !user.isActive) {
      throw new NotFoundError("User not found");
    }

    Object.assign(user, payload);

    await user.save();

    return UserDto.toResponse(user);
  }

  static async deleteUser(id: string) {
    const user = await UserModel.findById(id);

    if (!user || !user.isActive) {
      throw new NotFoundError("User not found");
    }

    user.isActive = false;

    await user.save();

    return;
  }


    /**
     * Get all Project Managers
     */
    static async getProjectManagers() {
        const managers = await UserModel.find({
            role: UserRole.PROJECT_MANAGER,
            isActive: true,
        }).sort({
            name: 1,
        });

        return UserDto.toResponseArray(managers);
    }

    /**
     * Get all Employees
     */
    static async getEmployees() {
        const employees = await UserModel.find({
            role: UserRole.EMPLOYEE,
            isActive: true,
        }).sort({
            name: 1,
        });

        return UserDto.toResponseArray(employees);
    }
}