import userRepository from "../repositories/user.repository.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ConflictError } from "../errors/ConflictError.js";
import {
  CreateUserDto,
  UpdateUserDto,
} from "../types/user.types.js";

class UserService {
  async getAllUsers() {
    return userRepository.getAllUsers();
  }

  async getUserById(id: number) {
    const user = await userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async createUser(data: CreateUserDto) {
    const existingEmployee =
      await userRepository.getUserByEmployeeId(data.employeeId);

    if (existingEmployee) {
      throw new ConflictError("Employee ID already exists");
    }

    const existingEmail =
      await userRepository.getUserByEmail(data.email);

    if (existingEmail) {
      throw new ConflictError("Email already exists");
    }

    return userRepository.create(data);
  }

  async updateUser(id: number, data: UpdateUserDto) {
    await this.getUserById(id);

    if (data.employeeId !== undefined) {
      const existingEmployee =
        await userRepository.getUserByEmployeeId(data.employeeId);

      if (existingEmployee && existingEmployee.id !== id) {
        throw new ConflictError("Employee ID already exists");
      }
    }

    if (data.email !== undefined) {
      const existingEmail =
        await userRepository.getUserByEmail(data.email);

      if (existingEmail && existingEmail.id !== id) {
        throw new ConflictError("Email already exists");
      }
    }

    return userRepository.update(id, data);
  }

  async deleteUser(id: number) {
    await this.getUserById(id);

    return userRepository.delete(id);
  }
}

export default new UserService();