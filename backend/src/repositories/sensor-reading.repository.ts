import { prisma } from "../config/prisma.js";
import {
  CreateSensorReadingDto,
  UpdateSensorReadingDto,
} from "../types/sensor-reading.types.js";

class SensorReadingRepository {
  async getAllSensorReadings() {
    return prisma.sensorreading.findMany({
      orderBy: {
        recordedAt: "desc",
      },
      include: {
        asset: true,
        location: true,
      },
    });
  }

  async getSensorReadingById(id: number) {
    return prisma.sensorreading.findUnique({
      where: {
        id,
      },
      include: {
        asset: true,
        location: true,
      },
    });
  }

  async getSensorReadingsByAssetId(assetId: number) {
    return prisma.sensorreading.findMany({
      where: {
        assetId,
      },
      orderBy: {
        recordedAt: "desc",
      },
      include: {
        asset: true,
        location: true,
      },
    });
  }

  async getSensorReadingsByLocationId(locationId: number) {
    return prisma.sensorreading.findMany({
      where: {
        locationId,
      },
      orderBy: {
        recordedAt: "desc",
      },
      include: {
        asset: true,
        location: true,
      },
    });
  }

  async getSensorReadingsByTimeRange(
    startDate: Date,
    endDate: Date
  ) {
    return prisma.sensorreading.findMany({
      where: {
        recordedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        recordedAt: "desc",
      },
      include: {
        asset: true,
        location: true,
      },
    });
  }

  async create(data: CreateSensorReadingDto) {
    return prisma.sensorreading.create({
      data,
      include: {
        asset: true,
        location: true,
      },
    });
  }

  async update(id: number, data: UpdateSensorReadingDto) {
    return prisma.sensorreading.update({
      where: {
        id,
      },
      data,
      include: {
        asset: true,
        location: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.sensorreading.delete({
      where: {
        id,
      },
    });
  }
}

export default new SensorReadingRepository();