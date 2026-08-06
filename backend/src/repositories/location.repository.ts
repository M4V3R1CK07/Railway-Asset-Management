import { prisma } from "../config/prisma.js";

class LocationRepository {
  async getAllLocations() {
    return prisma.location.findMany({
      orderBy: {
        stationName: "asc",
      },
    });
  }
}

export default new LocationRepository();