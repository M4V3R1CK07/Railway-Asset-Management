import { prisma } from "../config/prisma.js";
import {
  CreateUserDto,
  UpdateUserDto,
} from "../types/user.types.js";

class UserRepository {
  async getAllUsers() {
    return prisma.user.findMany({
      orderBy: {
        fullName: "asc",
      },
    });
  }

  async getUserById(id: number) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByEmployeeId(employeeId: string) {
    return prisma.user.findUnique({
      where: {
        employeeId,
      },
    });
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: CreateUserDto) {
    return prisma.user.create({
      data,
    });
  }

  async update(id: number, data: UpdateUserDto) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

export default new UserRepository();