import { prisma } from "../config/prisma.js";
import {
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
} from "../types/maintenance.types.js";

class MaintenanceRepository {
  async getAllMaintenance() {
    return prisma.maintenance.findMany({
      orderBy: {
        scheduledDate: "asc",
      },
      include: {
        asset: true,
        user: true,
      },
    });
  }

  async getMaintenanceById(id: number) {
    return prisma.maintenance.findUnique({
      where: {
        id,
      },
      include: {
        asset: true,
        user: true,
      },
    });
  }

  async getMaintenanceByAssetId(assetId: number) {
    return prisma.maintenance.findMany({
      where: {
        assetId,
      },
      orderBy: {
        scheduledDate: "asc",
      },
      include: {
        asset: true,
        user: true,
      },
    });
  }

  async getMaintenanceByAssignedToId(assignedToId: number) {
    return prisma.maintenance.findMany({
      where: {
        assignedToId,
      },
      orderBy: {
        scheduledDate: "asc",
      },
      include: {
        asset: true,
        user: true,
      },
    });
  }

  async create(data: CreateMaintenanceDto) {
    return prisma.maintenance.create({
      data,
      include: {
        asset: true,
        user: true,
      },
    });
  }

  async update(id: number, data: UpdateMaintenanceDto) {
    return prisma.maintenance.update({
      where: {
        id,
      },
      data,
      include: {
        asset: true,
        user: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.maintenance.delete({
      where: {
        id,
      },
    });
  }
}

export default new MaintenanceRepository();