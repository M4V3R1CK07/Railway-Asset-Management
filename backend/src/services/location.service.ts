import locationRepository from "../repositories/location.repository.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ConflictError } from "../errors/ConflictError.js";
import {
  CreateLocationDto,
  UpdateLocationDto,
} from "../types/location.types.js";

class LocationService {
  async getAllLocations() {
    return locationRepository.getAllLocations();
  }

  async getLocationById(id: number) {
    const location = await locationRepository.getLocationById(id);

    if (!location) {
      throw new NotFoundError("Location not found");
    }

    return location;
  }

  async createLocation(data: CreateLocationDto) {
    const existingLocation =
      await locationRepository.getLocationByStationCode(
        data.stationCode
      );

    if (existingLocation) {
      throw new ConflictError("Station code already exists");
    }

    return locationRepository.create(data);
  }

  async updateLocation(
    id: number,
    data: UpdateLocationDto
  ) {
    await this.getLocationById(id);

    return locationRepository.update(id, data);
  }

  async deleteLocation(id: number) {
    await this.getLocationById(id);

    return locationRepository.delete(id);
  }
}

export default new LocationService();