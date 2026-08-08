import { prisma } from "../config/prisma.js";
import {
  CreateAssetDto,
  UpdateAssetDto,
} from "../types/asset.types.js";

class AssetRepository {
  async getAllAssets() {
    return prisma.asset.findMany({
      orderBy: {
        assetName: "asc",
      },
      include: {
        location: true,
      },
    });
  }

  async getAssetById(id: number) {
    return prisma.asset.findUnique({
      where: {
        id,
      },
      include: {
        location: true,
      },
    });
  }

  async getAssetByCode(assetCode: string) {
    return prisma.asset.findUnique({
      where: {
        assetCode,
      },
    });
  }

  async create(data: CreateAssetDto) {
    return prisma.asset.create({
      data,
      include: {
        location: true,
      },
    });
  }

  async update(id: number, data: UpdateAssetDto) {
    return prisma.asset.update({
      where: {
        id,
      },
      data,
      include: {
        location: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.asset.delete({
      where: {
        id,
      },
    });
  }
}

export default new AssetRepository();