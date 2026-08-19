import { prisma } from "../config/prisma.js";
import {
  CreatePredictionDto,
  UpdatePredictionDto,
} from "../types/prediction.types.js";

class PredictionRepository {
  async getAllPredictions() {
    return prisma.prediction.findMany({
      orderBy: {
        predictedAt: "desc",
      },
      include: {
        asset: true,
        sensorreading: true,
      },
    });
  }

  async getPredictionById(id: number) {
    return prisma.prediction.findUnique({
      where: {
        id,
      },
      include: {
        asset: true,
        sensorreading: true,
      },
    });
  }

  async getPredictionBySensorReadingId(
    sensorReadingId: number
  ) {
    return prisma.prediction.findUnique({
      where: {
        sensorReadingId,
      },
      include: {
        asset: true,
        sensorreading: true,
      },
    });
  }

  async getPredictionsByAssetId(assetId: number) {
    return prisma.prediction.findMany({
      where: {
        assetId,
      },
      orderBy: {
        predictedAt: "desc",
      },
      include: {
        asset: true,
        sensorreading: true,
      },
    });
  }

  async create(data: CreatePredictionDto) {
    return prisma.prediction.create({
      data,
      include: {
        asset: true,
        sensorreading: true,
      },
    });
  }

  async update(id: number, data: UpdatePredictionDto) {
    return prisma.prediction.update({
      where: {
        id,
      },
      data,
      include: {
        asset: true,
        sensorreading: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.prediction.delete({
      where: {
        id,
      },
    });
  }
}

export default new PredictionRepository();