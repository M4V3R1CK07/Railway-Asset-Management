import { prisma } from "../config/prisma.js";
import { RegisterAuthDto } from "../types/auth.types.js";

class AuthRepository {
  async getAuthByUserId(userId: number) {
    return prisma.auth.findUnique({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  async getAuthByEmail(email: string) {
    return prisma.auth.findFirst({
      where: {
        user: {
          email,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async create(data: RegisterAuthDto) {
    return prisma.auth.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async updatePassword(
    userId: number,
    passwordHash: string
  ) {
    return prisma.auth.update({
      where: {
        userId,
      },
      data: {
        passwordHash,
      },
      include: {
        user: true,
      },
    });
  }

  async deleteByUserId(userId: number) {
    return prisma.auth.delete({
      where: {
        userId,
      },
    });
  }
}

export default new AuthRepository();