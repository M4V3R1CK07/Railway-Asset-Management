import maintenanceRepository from "../repositories/maintenance.repository.js";
import assetRepository from "../repositories/asset.repository.js";
import userRepository from "../repositories/user.repository.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ConflictError } from "../errors/ConflictError.js";
import {
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
} from "../types/maintenance.types.js";

class MaintenanceService {
  async getAllMaintenance() {
    return maintenanceRepository.getAllMaintenance();
  }

  async getMaintenanceById(id: number) {
    const maintenance =
      await maintenanceRepository.getMaintenanceById(id);

    if (!maintenance) {
      throw new NotFoundError("Maintenance record not found");
    }

    return maintenance;
  }

  async getMaintenanceByAssetId(assetId: number) {
    const asset = await assetRepository.getAssetById(assetId);

    if (!asset) {
      throw new NotFoundError("Asset not found");
    }

    return maintenanceRepository.getMaintenanceByAssetId(assetId);
  }

  async getMaintenanceByAssignedToId(assignedToId: number) {
    const user = await userRepository.getUserById(assignedToId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return maintenanceRepository.getMaintenanceByAssignedToId(
      assignedToId
    );
  }

  async createMaintenance(data: CreateMaintenanceDto) {
    const asset = await assetRepository.getAssetById(data.assetId);

    if (!asset) {
      throw new NotFoundError("Asset not found");
    }

    const user = await userRepository.getUserById(data.assignedToId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (data.completedDate && data.scheduledDate > data.completedDate) {
      throw new ConflictError(
        "Completed date cannot be before scheduled date"
      );
    }

    return maintenanceRepository.create(data);
  }

  async updateMaintenance(
    id: number,
    data: UpdateMaintenanceDto
  ) {
    await this.getMaintenanceById(id);

    if (data.assetId !== undefined) {
      const asset = await assetRepository.getAssetById(data.assetId);

      if (!asset) {
        throw new NotFoundError("Asset not found");
      }
    }

    if (data.assignedToId !== undefined) {
      const user = await userRepository.getUserById(data.assignedToId);

      if (!user) {
        throw new NotFoundError("User not found");
      }
    }

    if (data.scheduledDate && data.completedDate) {
      if (data.scheduledDate > data.completedDate) {
        throw new ConflictError(
          "Completed date cannot be before scheduled date"
        );
      }
    }

    return maintenanceRepository.update(id, data);
  }

  async deleteMaintenance(id: number) {
    await this.getMaintenanceById(id);

    return maintenanceRepository.delete(id);
  }
}

export default new MaintenanceService();