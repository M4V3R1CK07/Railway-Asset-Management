import { user_role } from "@prisma/client";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterAuthDto {
  userId: number;
  passwordHash: string;
}

export interface AuthenticatedUser {
  id: number;
  employeeId: string;
  fullName: string;
  email: string;
  role: user_role;
}