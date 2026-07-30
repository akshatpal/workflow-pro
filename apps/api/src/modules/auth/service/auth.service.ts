import { User } from "../../user/model/user.model.js";
import { comparePassword } from "../../../common/utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../common/utils/jwt.js";
import { UnauthorizedError } from "../../../common/errors/UnauthorizedError.js";

export class AuthService {
  static async login(email: string, password: string) {
    const user = await User.findOne({
      email: email.toLowerCase(),
      isActive: true,
    }).select("+password");

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordCorrect = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const payload = {
      userId: user.id,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.lastLogin = new Date();

    await user.save();

    const { password: _, ...userData } = user.toObject();

    return {
      user: userData,
      accessToken,
      refreshToken,
    };
  }
}