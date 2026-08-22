import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRepository from "../repositories/auth.repository.js";
import userRepository from "../repositories/user.repository.js";
import { ConflictError } from "../errors/ConflictError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ValidationError } from "../errors/ValidationError.js";
import {
  AuthenticatedUser,
  LoginDto,
  RegisterAuthDto,
} from "../types/auth.types.js";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
}

const SALT_ROUNDS = 10;

class AuthService {
  async register(userId: number, password: string) {
    const user = await userRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const existingAuth =
      await authRepository.getAuthByUserId(userId);

    if (existingAuth) {
      throw new ConflictError(
        "Authentication credentials already exist for this user"
      );
    }

    if (password.length < 8) {
      throw new ValidationError(
        "Password must be at least 8 characters long"
      );
    }

    const passwordHash = await bcrypt.hash(
      password,
      SALT_ROUNDS
    );

    const data: RegisterAuthDto = {
      userId,
      passwordHash,
    };

    await authRepository.create(data);

    return this.buildAuthenticatedUser(user);
  }

  async login(data: LoginDto) {
    const auth =
      await authRepository.getAuthByEmail(data.email);

    if (!auth) {
      throw new ValidationError(
        "Invalid email or password"
      );
    }

    const passwordMatches = await bcrypt.compare(
      data.password,
      auth.passwordHash
    );

    if (!passwordMatches) {
      throw new ValidationError(
        "Invalid email or password"
      );
    }

    const user = this.buildAuthenticatedUser(auth.user);

    const token = jwt.sign(
  {
    userId: user.id,
    role: user.role,
  },
  getJwtSecret(),
  {
    expiresIn: "1d",
  }
);

    return {
      user,
      token,
    };
  }

  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string
  ) {
    const auth =
      await authRepository.getAuthByUserId(userId);

    if (!auth) {
      throw new NotFoundError(
        "Authentication credentials not found"
      );
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      auth.passwordHash
    );

    if (!passwordMatches) {
      throw new ValidationError(
        "Current password is incorrect"
      );
    }

    if (newPassword.length < 8) {
      throw new ValidationError(
        "New password must be at least 8 characters long"
      );
    }

    const newPasswordHash = await bcrypt.hash(
      newPassword,
      SALT_ROUNDS
    );

    await authRepository.updatePassword(
      userId,
      newPasswordHash
    );

    return {
      message: "Password changed successfully",
    };
  }

  private buildAuthenticatedUser(user: {
    id: number;
    employeeId: string;
    fullName: string;
    email: string;
    role: AuthenticatedUser["role"];
  }): AuthenticatedUser {
    return {
      id: user.id,
      employeeId: user.employeeId,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
  }
}

export default new AuthService();