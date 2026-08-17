import sensorReadingRepository from "../repositories/sensor-reading.repository.js";
import assetRepository from "../repositories/asset.repository.js";
import locationRepository from "../repositories/location.repository.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import {
  CreateSensorReadingDto,
  UpdateSensorReadingDto,
} from "../types/sensor-reading.types.js";

class SensorReadingService {
  async getAllSensorReadings() {
    return sensorReadingRepository.getAllSensorReadings();
  }

  async getSensorReadingById(id: number) {
    const reading =
      await sensorReadingRepository.getSensorReadingById(id);

    if (!reading) {
      throw new NotFoundError("Sensor reading not found");
    }

    return reading;
  }

  async getSensorReadingsByAssetId(assetId: number) {
    const asset = await assetRepository.getAssetById(assetId);

    if (!asset) {
      throw new NotFoundError("Asset not found");
    }

    return sensorReadingRepository.getSensorReadingsByAssetId(
      assetId
    );
  }

  async getSensorReadingsByLocationId(locationId: number) {
    const location =
      await locationRepository.getLocationById(locationId);

    if (!location) {
      throw new NotFoundError("Location not found");
    }

    return sensorReadingRepository.getSensorReadingsByLocationId(
      locationId
    );
  }

  async getSensorReadingsByTimeRange(
    startDate: Date,
    endDate: Date
  ) {
    return sensorReadingRepository.getSensorReadingsByTimeRange(
      startDate,
      endDate
    );
  }

  async createSensorReading(data: CreateSensorReadingDto) {
    const asset = await assetRepository.getAssetById(data.assetId);

    if (!asset) {
      throw new NotFoundError("Asset not found");
    }

    const location =
      await locationRepository.getLocationById(data.locationId);

    if (!location) {
      throw new NotFoundError("Location not found");
    }

    return sensorReadingRepository.create(data);
  }

  async updateSensorReading(
    id: number,
    data: UpdateSensorReadingDto
  ) {
    await this.getSensorReadingById(id);

    if (data.assetId !== undefined) {
      const asset = await assetRepository.getAssetById(
        data.assetId
      );

      if (!asset) {
        throw new NotFoundError("Asset not found");
      }
    }

    if (data.locationId !== undefined) {
      const location =
        await locationRepository.getLocationById(data.locationId);

      if (!location) {
        throw new NotFoundError("Location not found");
      }
    }

    return sensorReadingRepository.update(id, data);
  }

  async deleteSensorReading(id: number) {
    await this.getSensorReadingById(id);

    return sensorReadingRepository.delete(id);
  }
}

export default new SensorReadingService();