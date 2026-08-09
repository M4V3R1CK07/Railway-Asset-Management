import { user_role } from "@prisma/client";

export interface CreateUserDto {
  employeeId: string;
  fullName: string;
  email: string;
  phone?: string;
  role?: user_role;
}

export interface UpdateUserDto {
  employeeId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  role?: user_role;
}