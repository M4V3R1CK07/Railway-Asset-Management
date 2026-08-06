import { prisma } from "../config/prisma.js";
import {
  CreateLocationDto,
  UpdateLocationDto,
} from "../types/location.types.js";

class LocationRepository {
  async getAllLocations() {
    return prisma.location.findMany({
      orderBy: {
        stationName: "asc",
      },
    });
  }

  async getLocationById(id: number) {
    return prisma.location.findUnique({
      where: { id },
    });
  }

  async getLocationByStationCode(stationCode: string) {
    return prisma.location.findUnique({
      where: { stationCode },
    });
  }

  async create(data: CreateLocationDto) {
    return prisma.location.create({
      data,
    });
  }

  async update(id: number, data: UpdateLocationDto) {
    return prisma.location.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.location.delete({
      where: { id },
    });
  }
}

export default new LocationRepository();